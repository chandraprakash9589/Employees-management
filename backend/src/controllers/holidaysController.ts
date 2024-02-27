import { Request, Response } from "express";
import HoliDays from "../models/holiDays";
const HoliDaysController = {
  async createHoliDays(req: Request, res: Response) {
    try {
      const holiDays = await HoliDays.create(req.body);
      if (holiDays) {
        res.json(holiDays);
      } else {
        res.status(404).json({ error: "holiDays not found." });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  },
  async getAllUserHoliDays(req: Request, res: Response) {
    try {
      const holiDays = await HoliDays.find({});
      res.status(200).json({ holiDays });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async UpdateHoliDays(req: any, res: Response) {
    try {
      const userId = req.params.id;
      const HoliDay = req.body;
      const userHolidays = await HoliDays.findByIdAndUpdate(
        userId,
        HoliDay,
        {
          new: true,
        }
      );
      if (userHolidays) {
        res.status(200).json(userHolidays);
      } else {
        res.status(404).json({ error: "HoliDays is not found." });
      }
    } catch (error) {
      console.error("Error updating HoliDays details:", error);
      res.status(500).json({
        error: "An error occurred while updating HoliDays details.",
      });
    }
  },
  async deleteHoliDays(req: any, res: Response) {
    try {
      const userId = req.params.id;
      const HoliDay = req.body;
      const userHolidays = await HoliDays.findByIdAndDelete(
        userId,
        HoliDay
      );
      if (userHolidays) {
        res.status(200).json({ message: "HoliDays deleted successfully" });
      } else {
        res.status(404).json({ error: "HoliDays is not found." });
      }
    } catch (error) {
      console.error("Error updating HoliDays details:", error);
      res.status(500).json({
        error: "An error occurred while updating HoliDays details.",
      });
    }
  },
};
export default HoliDaysController;
