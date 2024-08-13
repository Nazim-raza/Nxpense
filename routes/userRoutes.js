import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  loginUser,
} from "../controllers/userController.js";

//Router object
const router = express.Router();

//Routes
//create user
router.post("/create", createUser);

//Login user
router.post("/login", loginUser);

//Get Users
router.get("/getusers", getAllUsers);
router.get("/:id", getUserById);

export default router;
