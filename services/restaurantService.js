import  sequelize  from '../config/database.js';
import { QueryTypes } from 'sequelize';

export const getAllRestaurants = async (filters) => {
  const { name, cuisine, isAvailable } = filters;

  let query = `
    SELECT r.*
    FROM restaurant r
    LEFT JOIN restaurant_cuisines rc ON r.id = rc."restaurantId"
    LEFT JOIN cuisine c ON rc."cuisineId" = c.id
    WHERE 1=1
  `;

  const replacements = {};

  if (name) {
    query += ` AND r.name ILIKE :name`;
    replacements.name = `%${name}%`;
  }

  if (isAvailable !== undefined) {
    query += ` AND r."isAvailable" = :isAvailable`;
    replacements.isAvailable = isAvailable === 'true';
  }

  if (cuisine) {
    query += ` AND c.name ILIKE :cuisine`;
    replacements.cuisine = `%${cuisine}%`;
  }

  query += ` GROUP BY r.id`;

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
    `SELECT * FROM menu_item WHERE "restaurantId" = :restaurantId`,
    { replacements: { restaurantId }, type: QueryTypes.SELECT }
  );
};

export const getRestaurantCuisines = async (restaurantId) => {
  return await sequelize.query(
    `
    SELECT c.*
    FROM cuisine c
    INNER JOIN restaurant_cuisines rc ON c.id = rc."cuisineId"
    WHERE rc."restaurantId" = :restaurantId
    `,
    { replacements: { restaurantId }, type: QueryTypes.SELECT }
  );
};

export const getAvailableRestaurants = async () => {
  const query = `
    SELECT *
    FROM restaurant
    WHERE "isAvailable" = true
  `;

  return await sequelize.query(query, {
    type: QueryTypes.SELECT
  });
};