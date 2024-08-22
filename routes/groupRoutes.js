import express from "express";

import {
  addUserToGroup,
  createGroup,
  getAllGroups,
  getGroupinfo,
} from "../controllers/groupController.js";

const router = express.Router();

//routes
//create group
router.post("/create-group", createGroup);

// //add user to group
router.post("/:groupId/adduser", addUserToGroup);

// //get group details
router.get("/groups", getAllGroups);
router.get("/:groupId", getGroupinfo);

// //add expense to group
// router.post("/:groupID/addexpense", addExpenseToGroup);

export default router;
