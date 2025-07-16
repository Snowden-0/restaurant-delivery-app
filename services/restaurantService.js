import  sequelize  from '../config/database.js';
import { QueryTypes } from 'sequelize';

export const getAllRestaurants = async (filters) => {
  const { name, cuisine, showAll } = filters;

  let query = `
    SELECT r.*
    FROM restaurant r
    LEFT JOIN restaurant_cuisines rc ON r.id = rc."restaurant_id"
    LEFT JOIN cuisine c ON rc."cuisine_id" = c.id
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

  // Show only available restaurants if showAll !== 'true'
  if (showAll !== 'true') {
    query += ` AND r."isAvailable" = true`;
  }

  return await sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements
  });
};

export const getRestaurantById = async (id) => {
  return await sequelize.query(
    `SELECT * FROM restaurant WHERE id = :id`,
    { replacements: { id }, type: QueryTypes.SELECT }
  );
};

export const getRestaurantMenu = async (restaurantId) => {
  return await sequelize.query(
    `SELECT * FROM menu_item WHERE "restaurant_id" = :restaurant_id`,
    { replacements: { restaurant_id: restaurantId }, type: QueryTypes.SELECT }
  );
};

