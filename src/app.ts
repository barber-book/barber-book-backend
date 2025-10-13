import express from "express";
import userRoutes from "./routes/userRoutes.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";

export default class App {


  public app = express();

  constructor() {
    this.app.use(express.json());
    this.app.use("/user", userRoutes);
    this.app.use(errorHandler);

  }

}

const appInstance = new App();
export { appInstance as app };

