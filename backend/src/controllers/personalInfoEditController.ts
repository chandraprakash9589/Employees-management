import { Request, Response } from "express";
import PersonalInfo from "../models/personalInfoEdit";
const UpdatePersonalInfoController = {
  async createPersonalInfo(req: any, res: Response) {
    try {
      const newTaskData = {
        ...req.body,
      };
      const personalInfo = await PersonalInfo.create(newTaskData);
      res.status(201).json(personalInfo);
    } catch (error) {
      console.error("Error create project:", error);
      res.status(500).json({
        error: "error is created the project infomation.",
      });
    }
  },
  async updatePersonalInfo(req: any, res: Response) {
    try {
      const userId = req.params.id;
      const personalInfo = await PersonalInfo.findOneAndUpdate(
        { user: userId },
        req.body,
        { new: true }
      );
      if (personalInfo) {
        res.json(personalInfo);
      } else {
        res.status(404).json({ error: "personal information is not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async getAllPersonalInfo(req: Request, res: Response) {
    try {
      const personalInfo = await PersonalInfo.find();
      res.status(200).json({ personalInfo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "get Internal server error" });
    }
  },
};

export default UpdatePersonalInfoController;
