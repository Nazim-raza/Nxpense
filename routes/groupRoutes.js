import express from "express";

import {
  addUserToGroup,
  createGroup,
  getAllGroups,
  getGroupinfo,
  searchUsers,
} from "../controllers/groupController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//routes
//create group
router.post("/create-group", requireSignIn, createGroup);

// Route to get groups for a specific user
router.get("/groups", requireSignIn, getAllGroups);

// //add user to group
router.post("/:groupId/adduser", requireSignIn, addUserToGroup);

//search User
router.get("/searchusers", requireSignIn, searchUsers);

// //get group details
router.get("/:groupId", requireSignIn, getGroupinfo);

// //add expense to group
// router.post("/:groupID/addexpense", addExpenseToGroup);

export default router;
