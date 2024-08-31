import Group from "../models/groupModel.js";
import User from "../models/userModel.js";

//===============Create Group==================
export const createGroup = async (req, res) => {
  try {
    const { name, userIds } = req.body;

    if (!name || !userIds) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required details",
      });
    }

    // Check if all userIds exist in the User collection
    const users = await User.find({ _id: { $in: userIds } });
    if (!users) {
      return res
        .status(404)
        .send({ success: false, message: "One or more users not found" });
    }

    const group = new Group({ name, users: userIds });

    await group.save();
    res.status(200).send({
      success: true,
      message: "Group created",
      group,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Group creation failed",
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
  } catch (error) {
    console.log(error);
  }
};

//==========SearchUser to add in the Group==============

export const searchUsers = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyword).find({
      _id: { $ne: req.user?._id },
    });
    res.status(200).send(users);
  } catch (error) {
    console.log("Error in Search user");
  }
};
