import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
// Initialize Sequelize with environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);
// Function to synchronize the "users" table with the database
const syncDB = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS "users" (
      "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      "username" VARCHAR(255) NOT NULL UNIQUE,
      "password" VARCHAR(255) NOT NULL,
      "is_active" BOOLEAN NOT NULL DEFAULT TRUE, -- ADD THIS LINE
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  // if the table already exists
  const alterQuery = `
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "is_active" BOOLEAN NOT NULL DEFAULT TRUE;
  `;

  try {
    await sequelize.query(query);
    await sequelize.query(alterQuery);
    console.log('Table "users" is synchronized with the database.');
  } catch (error) {
    console.error('Error synchronizing table "users":', error);
  }
};
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL Connection has been established successfully.");
    await syncDB();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default sequelize;
