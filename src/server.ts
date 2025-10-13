import app from "./app.js";
import { sequelize } from "./database/db.js";

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database!");
    await sequelize.sync({ alter: true }); 
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Error starting the server:", err);
    process.exit(1);
  }
}

start();
