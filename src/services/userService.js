import CrudService from "./crudService.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import ResponseHandler from "../utils/responseHandler.js";

class UserService extends CrudService {
  constructor() {
    super(User, "email"); 
  }
  
  async create(data) {
    if (!data.password) {
      throw new Error("Password is required");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newData = { ...data, password: hashedPassword };

    return super.create(newData);
  }

  async update(id, data) {
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
    }

    return super.update(id, data);
  }

  async validateLogin(email, password) {
    const user = await this.model.findOne({ where: { email } });

    if (!user) {
      ResponseHandler.notFoundError("User", email);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      ResponseHandler.invalidToken("password");
    }

    return ResponseHandler.success("Login successful", {
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }
}

export default new UserService();
