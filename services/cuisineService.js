import sequelize from '../config/database.js'; // Assuming you have a database config
import { QueryTypes } from 'sequelize';

export const getAllCuisines = async () => {
  try {
    const query = `
      SELECT
        id,
        name
      FROM
        cuisine;
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

export const getRestaurantsByCuisineId = async (cuisineId) => {
  try {
    const query = `
      SELECT
        r.id,          
        r.name,
        r.address,
        r.phone,
        r.description,
        r.image_url,
        r.is_available
      FROM
        restaurant AS r
      JOIN
        restaurant_cuisines AS rc ON r.id = rc.restaurant_id
      WHERE
        rc.cuisine_id = :cuisineId;
    `;

    const restaurants = await sequelize.query(query, {
      replacements: { cuisineId },
      type: QueryTypes.SELECT
    });

    return restaurants;
  } catch (error) {
    console.error('Error fetching restaurants by cuisine ID:', error);
    throw error;
  }
};