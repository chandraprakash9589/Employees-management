import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Create an array to store revoked tokens
const tokenBlacklist = [];

type RequestType = {
  email: string;
  password: string;
};

const authController = {
  async login(req: Request<RequestType>, res: any) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ errorMessage: "User not found" });
      }

      const isPasswordChecked = await bcrypt.compare(password, user.password);

      if (!isPasswordChecked) {
        return res.status(401).json({ errorMessage: "Invalid password" });
      }

      const token = jwt.sign(
        {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          _id: user._id,
        },
        process.env.jwtSecret,
        { expiresIn: "55h" }
      );
      res.cookie("access_token", token, {
        httpOnly: true,
        expiresIn: "55h",
      });
      res.status(200).json({
        message: "Login successful",
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (err) {
      console.error("Error during login:", err);
      res.status(500).json({ errorMessage: "Internal Server Error" });
    }
  },

  async logout(req: any, res: any) {
    try {
      const token = req.cookies.access_token;

      if (!token) {
        return res
          .status(400)
          .json({ error: "Token not found in the request." });
      }

      res.clearCookie("access_token");
      tokenBlacklist.push(token);
      res.status(200).json("Logged out successfully");
    } catch (err: any) {
      alert(err);
      res.status(500).json({ error: "An error occurred during logout." });
    }
  },

  async getAllUserEmails(req, res) {
    try {
      const users = await User.find({}, "email");

      if (!users || users.length === 0) {
        return res.status(404).json({ error: "No users found" });
      }

      const emails = users.map((user) => user.email);

      res.status(200).json({ emails });
    } catch (error) {
      alert(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getAllUser(req, res) {
    try {
      const users = await User.find();
      if (!users || users.length === 0) {
        return res.status(404).json({ error: "No users found" });
      }
      res.status(200).json({ users });
    } catch (error) {
      alert(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

// Export the tokenBlacklist array so that it can be used in other parts of your application
export { tokenBlacklist };
export default authController;
