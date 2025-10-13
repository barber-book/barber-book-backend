import { Request, Response, NextFunction } from "express";
import userService from "../services/userService.ts";

export class UserController {
  
  async listUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.readAll();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.read(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.create(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.update(req.params.id, req.body);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.delete(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      const result = await userService.validateLogin(email, password);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

const userController = new UserController();

export const listUsers = userController.listUsers.bind(userController);
export const getUser = userController.getUser.bind(userController);
export const createUser = userController.createUser.bind(userController);
export const updateUser = userController.updateUser.bind(userController);
export const deleteUser = userController.deleteUser.bind(userController);
export const login = userController.login.bind(userController);
