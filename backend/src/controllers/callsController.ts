import { Request, Response } from "express";
import Calls from "../models/calls";

const CallsController = {
  async createCalls(req: Request, res: Response) {
    try {
      const calls = await Calls.create(req.body);
      if (calls) {
        res.json(calls);
      } else {
        res.status(404).json({ error: "calls not found." });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  },
  async getAllUserCalls(req: any, res: Response) {
    try {
      const userId = req.params.id;
      const calls = await Calls.find({ user: userId });
      res.status(200).json({ calls });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
export default CallsController;
