import Group from "../models/groupModel.js";
import User from "../models/userModel.js";
import Expense from "../models/expenseModel.js";

//===============Create Group==================
export const createGroup = async (req, res) => {
  try {
    const { name, userEmails } = req.body;

    if (!name || !userEmails) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required details",
      });
    }

    // Find user IDs based on the provided emails
    const users = await User.find({ email: { $in: userEmails } });
    if (users.length !== userEmails.length) {
      return res.status(404).send({
        success: false,
        message: "Some users not found",
      });
    }

    const userIds = users.map((user) => user._id);

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

// export const getAllGroups = async (req, res) => {
//   try {
//     const groups = await Group.find({});

//     if (groups.length === 0) {
//       return res.status(404).send({
//         success: false,
//         message: "Group not found",
//       });
//     }
//     res.status(200).send(groups);
//   } catch (error) {
//     console.log(error);
//   }
// };

//==============Get Group Details==================

export const getGroupinfo = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId)
      .populate("users", "name")
      .populate({
        path: "expenses",
        populate: {
          path: "userId",
          select: "name", // Only select the 'name' field
        },
      })
      .populate({
        path: "expenses.splits.userId", // Populate user details in splits
        select: "name", // Only select the 'name' field
      });

    if (!group) {
      return res.status(404).send({
        success: false,
        message: "Group not found",
      });
    }

    const totals = group.users.map((user) => {
      let totalOwed = 0;
      let totalLent = 0;
      let totalBorrowed = 0;

      group.expenses.forEach((expense) => {
        expense.splits.forEach((split) => {
          if (split.userId.equals(user._id)) {
            totalOwed += split.owes;
            totalLent += split.lent;
            totalBorrowed += split.owes > 0 ? split.owes : 0;
          }
        });
      });

      return {
        userId: user._id,
        name: user.name,
        totalOwed,
        totalLent,
        totalBorrowed,
      };
    });

    res.status(200).send({
      group,
      totals,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to retrieve group details",
      error,
    });
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

//============Get Groups for a Specific User====================
export const getUserGroups = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find groups where the user is a member
    const groups = await Group.find({ users: userId });

    if (!groups || groups.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No groups found for this user",
      });
    }

    res.status(200).send({
      success: true,
      groups,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error",
      error,
    });
  }
};

//================Add-Group-Expense=============
export const addGroupExpense = async (req, res) => {
  const userId = req.user._id;
  const groupId = req.params.groupId;
  const { note, amount } = req.body;

  try {
    const group = await Group.findOne({ _id: groupId, users: userId });

    if (!group) {
      return res.status(403).send({
        success: false,
        message: "You are not authorized to add expenses to this group",
      });
    }

    const splitAmount = amount / group.users.length;
    const splits = group.users.map((user) => ({
      userId: user,
      amount: splitAmount,
    }));

    const newExpense = new Expense({
      note,
      amount,
      group: groupId,
      userId: userId,
      splits,
    });

    await newExpense.save();

    group.expenses.push(newExpense._id);
    await group.save();

    res.status(200).json({ success: true, newExpense });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add expense", error });
  }
};

//========Get Expenses for a Specific Group for the Logged-in User========
export const getGroupExpenses = async (req, res) => {
  try {
    const userId = req.user._id;
    const groupId = req.params.groupId;

    // Find the group and ensure the user is a member
    const group = await Group.findOne({ _id: groupId, users: userId });

    if (!group) {
      return res.status(403).send({
        success: false,
        message: "You are not authorized to view expenses for this group",
      });
    }

    // Get expenses for this group and populate the userId field
    const expenses = await Expense.find({ group: groupId })
      .populate("userId", "name") // Populate with 'name' field from User
      .exec();

    console.log(expenses); // Log to verify data

    res.status(200).send({
      success: true,
      expenses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Failed to retrieve expenses",
      error,
    });
  }
};
