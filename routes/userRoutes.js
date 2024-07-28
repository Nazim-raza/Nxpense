import express from "express";
import { createUserController, getAllUsersController, getUserById } from "../controllers/userController.js";

//Router object
const router = express.Router();

//Routes
//create user

router.post("/create", createUserController);

//Get Users
router.get('/getusers', getAllUsersController);
router.get('/:id', getUserById);

export default router;
