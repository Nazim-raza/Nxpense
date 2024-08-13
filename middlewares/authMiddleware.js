import JWT from "jsonwebtoken";
import User from "../models/userModel.js";

//Required Sign in Middleware
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "requireSignIn for use",
      error,
    });
  }
};

//Check Admin

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.role !== 1) {
      return res.status.send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in isAdmin",
      error,
    });
  }
};
