import sequelize from '../config/database.js';
import bcrypt from 'bcryptjs';

export const findUserByUsername = async (username) => {
  try {
    const query = `SELECT * FROM "users" WHERE "username" = :username;`;
    const [results] = await sequelize.query(query, {
      replacements: { username },
      type: sequelize.QueryTypes.SELECT,
    });
    return results; // Sequelize returns the first result object directly
  } catch (error) {
    console.error('Error finding user by username:', error);
    throw error;
  }
};

export const createUser = async (username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const query = `
      INSERT INTO "users" (username, password) 
      VALUES (:username, :password) 
      RETURNING id, username;
    `;
    const [results] = await sequelize.query(query, {
      replacements: { username, password: hashedPassword },
      type: sequelize.QueryTypes.INSERT,
    });
    return results[0]; // Return the newly created user
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};