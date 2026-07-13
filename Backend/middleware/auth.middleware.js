import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authmiddleware = async (req, res, next) => {
  try {

    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        debug: {
          headerCookie: req.headers.cookie || null,
          parsedCookies: req.cookies,
        },
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: error.message,
    });
  }
};