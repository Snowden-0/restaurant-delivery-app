import sequelize from '../config/database.js';
import { QueryTypes } from 'sequelize';

export const getAllRestaurants = async (filters) => {
  const { name, cuisine, showAvailable } = filters;

  let query = `
    SELECT DISTINCT r.*
    FROM restaurant r
    LEFT JOIN restaurant_cuisines rc ON r.id = rc.restaurant_id
    LEFT JOIN cuisine c ON rc.cuisine_id = c.id
    WHERE 1=1
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

  try { // Added try block
    return await sequelize.query(query, {
      type: QueryTypes.SELECT,
      replacements
    });
  } catch (error) { // Added catch block
    console.error('Error fetching all restaurants:', error);
    throw error; // Re-throw the error so the calling controller can handle it
  }
};

export const getRestaurantById = async (id) => {
  try { // Added try block
    return await sequelize.query(
      `SELECT * FROM restaurant WHERE id = :id`,
      { replacements: { id }, type: QueryTypes.SELECT }
    );
  } catch (error) { // Added catch block
    console.error('Error fetching restaurant by ID:', error);
    throw error; // Re-throw the error
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
