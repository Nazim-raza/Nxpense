import Group from "../models/groupModel.js";
import User from "../models/userModel.js";

//Create Group
export const createGroup = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).send({ success: false, message: "Group name must" });
    }
    const group = new Group({ name });
    await group.save();
    res.status(200).send({
      success: true,
      message: "Group created",
      group,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "group failed",
      error,
    });
  }
};

//=============Add user to group=================

export const addUserToGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;

    const group = await Group.findById(groupId);
    if (!group)
      return res
        .status(404)
        .send({ success: false, message: "Group not found" });

    // Check if the user already exists in the group
    if (group.users.includes(userId)) {
      return res
        .status(400)
        .send({ success: false, message: "User already in the group" });
    }

    // Check if the user exists in the User collection
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    group.users.push(userId);
    await group.save();
    res
      .status(200)
      .send({ success: true, message: "User Added to group", group });
  } catch (error) {
    res.status(404).send({ success: false, message: "server error", error });
  }
};

//=============getAllGroups=========================

export const getAllGroups = async (req, res) => {
  try {
<<<<<<< HEAD
    const groups = await Group.find({});

    if (groups.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Group not found",
      });
    }
    res.status(200).send(groups);
  } catch (error) {
    console.log(error);
  }
};

//==============Get Group Details==================

export const getGroupinfo = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId)
      .populate("users")
      .populate("expenses");

    if (!group) {
      return res.status(404).send({
        success: false,
        message: "Group not found",
      });
    }
    res.status(200).send(group);
=======
    const res = await Group.findById(groupId);
>>>>>>> 305485bfdd4a7454655f22de37a407d5286f17f9
  } catch (error) {
    console.log(error);
  }
};
