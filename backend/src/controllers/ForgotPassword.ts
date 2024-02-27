import { Request, Response } from "express";
import nodemailer from "nodemailer";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";

const sendForgotEmailController = {
  async createForgotEmail(req: Request, res: Response) {
    const { email } = req.body;
    try {
      const oldUser = await User.findOne({ email });
      if (!oldUser) {
        return res.status(404).json({ status: "User Not Found" });
      }

      // Generating token using jwtSecret and user's password
      const secret = process.env.jwtSecret + oldUser.password;
      const token = jwt.sign(
        { email: oldUser.email, id: oldUser._id },
        secret,
        {
          expiresIn: "2m",
        }
      );

      const link = `http://localhost:3000/forgotPass/reset-password/${oldUser._id}/${token}`;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "portal9589@gmail.com",
          pass: "tskm ljfm qauv oskz",
        },
      });

      const htmlContent = `
        <html>
          <head>
            <style>
              /* Add any styling here */
            </style>
          </head>
          <body>
            <h1>Hello ${oldUser.email}!</h1>
            <p>Someone has requested a link to change your password. You can do this through the link below:</p>
            <p><a href="${link}">Change my password</a></p>
            <p>If you didn't request this, please ignore this email.</p>
            <p>Your password won't change until you access the link above and create a new one.</p>
            <p>Best Regards,</p>
            <p>BestPeers Team.</p>
          </body>
        </html>
      `;
      const mailOptions = {
        from: "portal9589@gmail.com",
        to: oldUser.email,
        subject: "Password Reset",
        html: htmlContent,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error("Error sending forgot password email:", error);
          return res.status(500).json({ status: "Error sending email" });
        } else {
          console.log("Email sent: " + info.response);
          return res.status(200).json({ status: "Email sent successfully" });
        }
      });
    } catch (error) {
      console.error("Error sending forgot password email:", error);
      return res.status(500).json({ status: "Internal Server Error" });
    }
  },

  async getResetPassword(req: Request, res: Response) {
    const { id, token } = req.params;
    try {
      const oldUser = await User.findById(id);
      if (!oldUser) {
        return res.status(404).json({ status: "User Not Found" });
      }
      const secret = process.env.jwtSecret + oldUser.password;
      const verify = jwt.verify(token, secret);
      return res
        .status(200)
        .json({ email: verify.email, status: "Token Verified" });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        console.error("Token expired:", error);
        return res.status(401).json({ status: "Token expired" });
      } else if (error instanceof JsonWebTokenError) {
        console.error("Invalid token:", error);
        return res.status(400).json({ status: "Invalid token" });
      } else {
        console.error("Error verifying token:", error);
        return res.status(500).json({ status: "Internal Server Error" });
      }
    }
  },

  async createResetPassword(req: Request, res: Response) {
    const { id, token } = req.params;
    const { password } = req.body;
    try {
      const oldUser = await User.findById(id);
      if (!oldUser) {
        return res.status(404).json({ status: "User Not Found" });
      }
      const secret = process.env.jwtSecret + oldUser.password;
      const verify = jwt.verify(token, secret);
      const encryptedPassword = await bcrypt.hash(password, 10);
      await User.findByIdAndUpdate(id, { password: encryptedPassword });
      return res
        .status(200)
        .json({ email: verify.email, status: "Password updated" });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        console.error("Token expired:", error);
        return res.status(401).json({ status: "Token expired" });
      } else if (error instanceof JsonWebTokenError) {
        console.error("Invalid token:", error);
        return res.status(400).json({ status: "Invalid token" });
      } else {
        console.error("Error verifying token:", error);
        return res.status(500).json({ status: "Internal Server Error" });
      }
    }
  },
};

export default sendForgotEmailController;
