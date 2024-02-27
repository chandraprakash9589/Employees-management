import { Request, Response } from "express";
import LeaveSections from "../models/leaveSection";
import User from "../models/User";

const createLeaveController = {
  async createLeave(req: any, res: Response) {
    try {
      const userId = req.params.id;
      const userData = await User.findById(userId);
      const LeaveData = {
        ...req.body,
        firstName: userData.firstName,
        lastName: userData.lastName,
        status: "Pending",
      };
      const leaveInfo = await LeaveSections.create(LeaveData);
      res.status(201).json(leaveInfo);
    } catch (error) {
      console.error("Failed to apply for leave", error);
      res.status(500).json({
        error: "error is created the leave section.",
      });
    }
  },
  // Cancel leave
  async cancelLeave(req: any, res: Response) {
    try {
      const { id } = req.params;
      await LeaveSections.findByIdAndUpdate(id, { status: "Cancelled" });
      res.status(200).json({ message: "Leave cancelled successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Failed to cancel leave", error: error.message });
    }
  },
  // Get leave requests
  async getLeaveRequests(req: Request, res: Response) {
    try {
      const leaveRequests = await LeaveSections.find({});
      res.status(200).json({ leaveRequests });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Failed to get leave requests",
        error: error.message,
      });
    }
  },
  // Approve leave
  async approveLeave(req: any, res: Response) {
    try {
      const { id } = req.params;
      await LeaveSections.findByIdAndUpdate(id, { status: "Approved" });
      res.status(200).json({ message: "Leave approved successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Failed to approve leave", error: error.message });
    }
  },
  async getAllLeaveOfUser(req: any, res: Response) {
    try {
      const userId = req.params.id;
      const leaveInfo = await LeaveSections.find({ user: userId });
      res.status(200).json({ leaveInfo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "get Internal server error" });
    }
  },
  async deleteLeave(req: any, res: Response) {
    try {
      const userId = req.params.id;
      const leaveInfoBody = req.body;
      const leaveInfo = await LeaveSections.findByIdAndDelete(
        userId,
        leaveInfoBody
      );
      if (leaveInfo) {
        res.status(200).json({ message: "MyLeave deleted successfully" });
      } else {
        res.status(404).json({ error: "MyLeave is not found." });
      }
    } catch (error) {
      console.error("Error updating MyLeave details:", error);
      res.status(500).json({
        error: "An error occurred while updating MyLeave details.",
      });
    }
  },
};
export default createLeaveController;
