import sequelize from '../config/database.js';
import bcrypt from 'bcryptjs';

export const findUserByEmail = async (email) => {
  try {
    const query = `SELECT * FROM "user" WHERE "email" = :email;`;
    const [results] = await sequelize.query(query, {
      replacements: { email },
      type: sequelize.QueryTypes.SELECT,
    });
    return results; // Sequelize returns the first result object directly
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
};

export const createUser = async (name, email, password, phone_number, address) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const query = `
      INSERT INTO "user" (name, email, password, phone_number, address) 
      VALUES (:name, :email, :password, :phone_number, :address) 
      RETURNING id, name, email, phone_number, address;
    `;
    const [results] = await sequelize.query(query, {
      replacements: { name, email, password: hashedPassword, phone_number, address },
      type: sequelize.QueryTypes.INSERT,
    });
    return results[0]; // Return the newly created user
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const findUserById = async (id) => {
  try {
    // Modify this query to select all required fields
    const query = `SELECT id, name, email, phone_number, address FROM "user" WHERE "id" = :id;`;
    const [results] = await sequelize.query(query, {
      replacements: { id },
      type: sequelize.QueryTypes.SELECT,
    });
    return results;
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw error;
  }
};