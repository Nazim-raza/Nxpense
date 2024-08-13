import User from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

//==============Register User==============
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json("Please fill all details");
    }

    //Check existing user

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Already registred please login",
      });
    }

    const hashedPassword = await hashPassword(password);

    //create user instance & Save
    const user = new User({ name, email, password: hashedPassword }).save();

    // Respond with the created user
    res.status(201).json({
      user,
    });
  } catch (error) {
    console.log({ message: "Error in creating user", error });
    res.status(500).json({ message: "server error", error });
  }
};

//Get All users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).send({
      success: true,
      message: "All Users",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in getting users",
      error: error.message,
    });
  }
};

//getUserById
export const getUserById = async (req, res) => {
  const user1 = await User.findById(req.params.id);

  res.status(200).send({
    success: true,
    message: "User found",
    user1,
  });
};

//============Login User==============

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .send({ success: false, message: "please provide credentials" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).send({
        success: false,
        message: "User not register please register",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //Token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "error in token login",
      error,
    });
  }
};
