import express from "express";
<<<<<<< HEAD
import {
  addUserToGroup,
  createGroup,
  getAllGroups,
  getGroupinfo,
} from "../controllers/groupController.js";
=======
import { addUserToGroup, createGroup, getGroupDetails } from "../controllers/groupController.js";
>>>>>>> 305485bfdd4a7454655f22de37a407d5286f17f9

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
