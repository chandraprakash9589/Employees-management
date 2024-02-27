import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { tokenBlacklist } from "../controllers/authController";

const authenticateUser = (req: any, res: Response, next: NextFunction) => {
  const authToken = req.header("Authorization");
  if (!authToken) {
    return res.status(401).json({ error: "Authorization header missing." });
  }
  const token = authToken.split(" ")[1];

  // Check if the token is in the blacklist
  if (tokenBlacklist.includes(token)) {
    return res.status(401).json({ error: "Token is no longer valid." });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtSecret) as {
      email: string;
      _id: string;
    };
    req.user = { email: decoded.email, _id: decoded._id };
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid authorization token." });
  }
};

export default authenticateUser;
