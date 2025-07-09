import sequelize from "../config/database.js";
import bcrypt from "bcryptjs";

//--------------FUNCTION TO FIND USER BY USERNAME THAT ARE STILL ACTIVE-------------------

export const findUserByUsername = async (username) => {
  try {
    const query = `SELECT * FROM "users" WHERE "username" = :username AND "is_active" = TRUE;`;
    const [results] = await sequelize.query(query, {
      replacements: { username },
      type: sequelize.QueryTypes.SELECT,
    });
    return results;
  } catch (error) {
    console.error("Error finding user by username:", error);
    throw error;
  }
};

//--------------FUNCTION TO FIND USER BY ID-------------------

export const findUserById = async (id) => {
  try {
    const query = `SELECT * FROM "users" WHERE "id" = :id;`;
    const [results] = await sequelize.query(query, {
      replacements: { id },
      type: sequelize.QueryTypes.SELECT,
    });
    return results;
  } catch (error) {
    console.error("Error finding user by id:", error);
    throw error;
  }
};

//--------------FUNCTION TO CREATE A NEW USER-------------------

export const createUser = async (username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO "users" (username, password) 
      VALUES (:username, :password) 
      RETURNING id, username;
    `;
    const [results] = await sequelize.query(query, {
      replacements: { username, password: hashedPassword },
      type: sequelize.QueryTypes.INSERT,
    });
    return results[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

//--------------FUNCTION TO REVOKE USER ACCESS-------------------

export const revokeUserAccess = async (userId) => {
  try {
    const query = `UPDATE "users" SET "is_active" = FALSE WHERE "id" = :userId;`;
    await sequelize.query(query, {
      replacements: { userId },
      type: sequelize.QueryTypes.UPDATE,
    });
    return { success: true };
  } catch (error) {
    console.error("Error revoking user access:", error);
    throw error;
  }
};
