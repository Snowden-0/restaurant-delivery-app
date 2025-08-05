import sequelize from '../config/database.js';
import { QueryTypes } from 'sequelize';

export const getAllRestaurants = async (filters) => {
  // Destructure with a clear default for limit, matching frontend's common default if possible
  const { name, cuisine, cuisines, isOpen, minRating, page = 1, sort } = filters;
  // Explicitly handle limit to ensure it's always a number, prioritizing filters.limit
  const limit = filters.limit ? parseInt(filters.limit, 10) : 9; // Use 9 as default if not provided, matching frontend's DEFAULT_ITEMS_PER_PAGE

  // Convert page and limit to numbers and validate
  const pageNumber = Math.max(1, parseInt(page, 10));
  const limitNumber = Math.min(Math.max(1, limit), 100); // Max 100 items per page
  const offset = (pageNumber - 1) * limitNumber;

  let countQuery = `
    SELECT COUNT(DISTINCT r.id) as total_count
    FROM restaurant r
    LEFT JOIN restaurant_cuisines rc ON r.id = rc.restaurant_id
    LEFT JOIN cuisine c ON rc.cuisine_id = c.id
    LEFT JOIN "order" o ON r.id = o.restaurant_id
    LEFT JOIN ratings rt ON o.id = rt.order_id AND rt.deleted_at IS NULL
    WHERE r.deleted_at IS NULL
  `;

  let query = `
    SELECT DISTINCT 
      r.*,
      ROUND(AVG(rt.rating), 2) AS average_rating,
      COUNT(rt.id) AS total_ratings
    FROM restaurant r
    LEFT JOIN restaurant_cuisines rc ON r.id = rc.restaurant_id
    LEFT JOIN cuisine c ON rc.cuisine_id = c.id
    LEFT JOIN "order" o ON r.id = o.restaurant_id
    LEFT JOIN ratings rt ON o.id = rt.order_id AND rt.deleted_at IS NULL
    WHERE r.deleted_at IS NULL
  `;

  const replacements = {};

  if (name) {
    const nameFilter = ` AND r.name ILIKE :name`;
    query += nameFilter;
    countQuery += nameFilter;
    replacements.name = `%${name}%`;
  }

  if (cuisines && cuisines.length > 0) {
    const cuisineFilter = ` AND c.id IN (:cuisines)`;
    query += cuisineFilter;
    countQuery += cuisineFilter;
    replacements.cuisines = cuisines;
  } else if (cuisine) {
    const cuisineFilter = ` AND c.name ILIKE :cuisine`;
    query += cuisineFilter;
    countQuery += cuisineFilter;
    replacements.cuisine = `%${cuisine}%`;
  }

  if (isOpen === 'true') {
    const openFilter = ` AND r.is_available = true`;
    query += openFilter;
    countQuery += openFilter;
  } else if (isOpen === 'false') {
    const openFilter = ` AND r.is_available = false`;
    query += openFilter;
    countQuery += openFilter;
  }

  query += `
    GROUP BY r.id, r.name, r.address, r.phone, r.description, 
             r.image_url, r.is_available, r.created_at, r.updated_at
  `;

  if (minRating && !isNaN(parseFloat(minRating))) {
    query += ` HAVING AVG(rt.rating) >= :minRating`;
    replacements.minRating = parseFloat(minRating);
  }

  // --- Dynamic ORDER BY clause based on 'sort' parameter ---
  let orderByClause = '';
  switch (sort) {
    case 'name-asc':
      orderByClause = ` ORDER BY r.name ASC`;
      break;
    case 'name-desc':
      orderByClause = ` ORDER BY r.name DESC`;
      break;
    case 'rating-desc':
      // Sort by average_rating descending, NULLs last
      orderByClause = ` ORDER BY average_rating DESC NULLS LAST`;
      break;
    case 'rating-asc':
      // Sort by average_rating ascending, NULLs last
      orderByClause = ` ORDER BY average_rating ASC NULLS LAST`;
      break;
    default:
      // Default sort if no valid option is provided
      orderByClause = ` ORDER BY r.name ASC`;
      break;
  }

  query += orderByClause; // Add the dynamic order by clause
  query += ` LIMIT :limit OFFSET :offset`;
  replacements.limit = limitNumber;
  replacements.offset = offset;

  try {
    const [restaurants, countResult] = await Promise.all([
      sequelize.query(query, {
        type: QueryTypes.SELECT,
        replacements
      }),
      sequelize.query(countQuery, {
        type: QueryTypes.SELECT,
        replacements: { ...replacements }
      })
    ]);

    const totalCount = parseInt(countResult[0]?.total_count || 0);
    const totalPages = Math.ceil(totalCount / limitNumber);

    const processedRestaurants = restaurants.map(restaurant => ({
      ...restaurant,
      average_rating: restaurant.average_rating || null,
      total_ratings: parseInt(restaurant.total_ratings) || 0
    }));

    return {
      data: processedRestaurants,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalCount,
        limit: limitNumber,
        hasNextPage: pageNumber < totalPages,
        hasPreviousPage: pageNumber > 1
      }
    };
  } catch (error) {
    console.error('Error fetching all restaurants:', error);
    throw error;
  }
};

export const getRestaurantById = async (id) => {
  try {
    const restaurantQuery = `
      SELECT 
        r.*,
        ROUND(AVG(rt.rating), 2) AS average_rating,
        COUNT(rt.id) AS total_ratings
      FROM restaurant r
      LEFT JOIN "order" o ON r.id = o.restaurant_id
      LEFT JOIN ratings rt ON o.id = rt.order_id AND rt.deleted_at IS NULL
      WHERE r.id = :id AND r.deleted_at IS NULL
      GROUP BY r.id, r.name, r.address, r.phone, r.description, 
               r.image_url, r.is_available, r.created_at, r.updated_at
    `;

    const restaurant = await sequelize.query(restaurantQuery, {
      replacements: { id }, 
      type: QueryTypes.SELECT 
    });

    if (restaurant.length > 0) {
      const menuItems = await getRestaurantMenu(id);
      restaurant[0].menu = menuItems;
      restaurant[0].average_rating = restaurant[0].average_rating || null;
      restaurant[0].total_ratings = parseInt(restaurant[0].total_ratings) || 0;
    }
    return restaurant;
  } catch (error) {
    console.error('Error fetching restaurant by ID:', error);
    throw error;
  }
};

export const getRestaurantCuisines = async (restaurantId) => {
  try {
    const query = `
      SELECT
        c.id,
        c.name
      FROM
        cuisine AS c
      JOIN
        restaurant_cuisines AS rc ON c.id = rc.cuisine_id
      WHERE
        rc.restaurant_id = :restaurantId;
    `;

    const cuisines = await sequelize.query(query, {
      replacements: { restaurantId },
      type: QueryTypes.SELECT
    });

    return cuisines;
  } catch (error) {
    console.error('Error fetching cuisines for restaurant:', error);
    throw error;
  }
};

export const getRestaurantMenu = async (restaurantId) => {
  try {
    const query = `
      SELECT
        m.id,
        m.name,
        m.description,
        m.price,
        m.image_url,
        m.is_available,
        m.category,
        m.restaurant_id AS "restaurantId" 
      FROM
        menu_item AS m
      WHERE
        m.restaurant_id = :restaurantId;
    `;

    const menuItems = await sequelize.query(query, {
      replacements: { restaurantId },
      type: QueryTypes.SELECT
    });

    return menuItems;
  } catch (error) {
    console.error('Error fetching menu for restaurant:', error);
    throw error;
  }
};

export const getAllCuisines = async () => {
  try {
    const query = `
      SELECT DISTINCT
        c.id,
        c.name
      FROM
        cuisine AS c
      JOIN
        restaurant_cuisines AS rc ON c.id = rc.cuisine_id
      JOIN
        restaurant AS r ON rc.restaurant_id = r.id
      WHERE
        r.deleted_at IS NULL
      ORDER BY c.name;
    `;

    const cuisines = await sequelize.query(query, {
      type: QueryTypes.SELECT
    });

    return cuisines;
  } catch (error) {
    console.error('Error fetching all cuisines:', error);
    throw error;
  }
};