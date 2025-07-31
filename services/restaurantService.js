import sequelize from '../config/database.js';
import { QueryTypes } from 'sequelize';

export const getAllRestaurants = async (filters) => {
  const { name, cuisine, showAvailable } = filters;

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
    query += ` AND r.name ILIKE :name`;
    replacements.name = `%${name}%`;
  }

  if (cuisine) {
    query += ` AND c.name ILIKE :cuisine`;
    replacements.cuisine = `%${cuisine}%`;
  }

  if (showAvailable === 'true') {
    query += ` AND r.is_available = true`;
  }

  query += `
    GROUP BY r.id, r.name, r.address, r.phone, r.description, 
             r.image_url, r.is_available, r.created_at, r.updated_at
    ORDER BY r.name
  `;

  try {
    const restaurants = await sequelize.query(query, {
      type: QueryTypes.SELECT,
      replacements
    });

    return restaurants.map(restaurant => ({
      ...restaurant,
      average_rating: restaurant.average_rating || null,
      total_ratings: parseInt(restaurant.total_ratings) || 0
    }));
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
      // Format the rating data
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