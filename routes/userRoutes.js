import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  loginUser,
} from "../controllers/userController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

//Router object
const router = express.Router();

//Routes
//create user
router.post("/create", createUser);

//Login user
router.post("/login", loginUser);

//Get Users
router.get("/getusers", requireSignIn, getAllUsers);
router.get("/:id", requireSignIn, getUserById);

export default router;
