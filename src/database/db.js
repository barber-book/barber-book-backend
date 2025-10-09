import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config()

async function createDatabaseIfNotExists() {
  const tempSequelize = new Sequelize("postgresql://postgres:postgres@localhost:5432/postgres", {
    dialect: "postgres",
    logging: false,
  });
  
  try {
    await tempSequelize.query("CREATE DATABASE barber_book");
    console.log("Database barber_book created");
  } catch (error) {
    if (error.original?.code !== "42P04") {
      console.log("Database barber_book already exists or error:", error.message);
    }
  } finally {
    await tempSequelize.close();
  }
}

await createDatabaseIfNotExists();

export const sequelize = new Sequelize(process.env.DB_URL, {
   dialect: "postgres",
   logging: false,
});

export async function connectDB() {
   try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
   } catch (error) {
      console.error("Unable to connect to the database:", error);
      process.exit(1);
   }
}
