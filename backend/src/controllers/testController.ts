import { Request, Response } from "express";
import Tests from "../models/test";

const TestController = {
  async createTests(req: Request, res: Response) {
    try {
      const tests = await Tests.create(req.body);
      if (tests) {
        res.json(tests);
      } else {
        res.status(404).json({ error: "Tests not found." });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  },
  async getAllUserTests(req: any, res: Response) {
    try {
      const userId = req.params.id;
      const tests = await Tests.find({ user: userId });
      res.status(200).json({ tests });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
export default TestController;
