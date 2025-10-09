import express from "express";
import {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  login,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", listUsers);       
router.get("/:id", getUser);      
router.post("/", createUser);     
router.put("/:id", updateUser);   
router.delete("/:id", deleteUser); 


router.post("/login", login);

export default router;
