import express from "express";

import {
  addGroupExpense,
  addUserToGroup,
  createGroup,
  getGroupExpenses,
  getUserGroups,
  searchUsers,
  getGroupinfo,
} from "../controllers/groupController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//routes
//create group
router.post("/create-group", requireSignIn, createGroup);

// Route to get groups for a specific user
//router.get("/groups", requireSignIn, getAllGroups);

router.get("/user-groups", requireSignIn, getUserGroups);

// //add user to group
router.post("/:groupId/adduser", requireSignIn, addUserToGroup);

//search User
router.get("/searchusers", requireSignIn, searchUsers);

// //get group details
router.get("/:groupId", requireSignIn, getGroupinfo);

//Add Group expense
router.post("/:groupId/add-expense", requireSignIn, addGroupExpense);

//Get group expense
router.get("/:groupId/expenses", requireSignIn, getGroupExpenses);

export default router;
