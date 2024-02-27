import { Request, Response } from "express";
import User from "../models/User";
import DiscussionDesk from "../models/discussionDesk";

const UpdateDiscussionDeskController = {
  async createDiscussionDesk(req: any, res: Response) {
    try {
      const userId = req.params.id;
      const userData = await User.findById(userId);
      const newDiscussionData = {
        ...req.body,
        firstName: userData.firstName,
        lastName: userData.lastName,
        status: "Pending",
      };
      const discussionDesk = await DiscussionDesk.create(newDiscussionData);
      res.status(201).json(discussionDesk);
    } catch (error) {
      console.error("Error create discussion Data:", error);
      res.status(500).json({
        error: "failed to create the discussion infomation.",
      });
    }
  },
  async updateDiscussionDesk(req: any, res: Response) {
    const userId = req.params.id;
    const updateData = req.body;
    try {
      const getData = await DiscussionDesk.findByIdAndUpdate(
        userId,
        updateData,
        { new: true }
      );
      if (getData) {
        res.status(200).json(getData);
      } else {
        res.status(404).json({ error: "discussion data is not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async getDiscussionDesk(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const discussionDesk = await DiscussionDesk.find({ user: userId });
      res.status(200).json({ discussionDesk });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "got Internal server error" });
    }
  },

  async deletediscussion(req: any, res: Response) {
    try {
      const userId = req.params.id;
      const deleteDiscussion = req.body;
      const discussionData = await DiscussionDesk.findByIdAndDelete(
        userId,
        deleteDiscussion
      );
      if (discussionData) {
        res.status(200).json({ message: "Discussion data deleted successfully" });
      } else {
        res.status(404).json({ error: "Discussion data not found." });
      }
    } catch (error) {
      console.error("Error deleting discussion details:", error);
      res.status(500).json({
        error: "An error occurred while deleting Discussion details.",
      });
    }
  },
};

export default UpdateDiscussionDeskController;
