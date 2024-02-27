import { Request, Response } from "express";
import ChangeStatus from "../models/changeStatus";

const changeStatusController = {
  async createchangeStatus(req: Request, res: Response) {
    try {
      const Status = await ChangeStatus.create(req.body);
      if (Status) {
        res.json(Status);
      } else {
        res.status(404).json({ error: "Change Status not found." });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  },
  async getUserChangeStatus(req: any, res: Response) {
    try {
      const userId = req.params.id;
      const status = await ChangeStatus.find({ user: userId });
      res.status(200).json({ status });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async UpdateChangeStatus(req: any, res: Response) {
    try {
      const userId = req.params.id;
      const updatedStatus = req.body;
      const userStatus = await ChangeStatus.findByIdAndUpdate(
        userId,
        updatedStatus,
        {
          new: true,
        }
      );
      if (userStatus) {
        res.status(200).json(userStatus);
      } else {
        res.status(404).json({ error: "status is not found." });
      }
    } catch (error) {
      console.error("Error updating status", error);
      res.status(500).json({
        error: "An error occurred while updating status ",
      });
    }
  },
};

export default changeStatusController;
