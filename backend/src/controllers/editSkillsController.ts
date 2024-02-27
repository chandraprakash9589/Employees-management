import { Request, Response } from "express";
import Editskills from "../models/editSkills";
const createEditSkillsController = {
  async createEditSkills(req: any, res: Response) {
    try {
      const EditSkills = {
        ...req.body,
      };
      const EditSkillsInfo = await Editskills.create(EditSkills);
      res.status(201).json(EditSkillsInfo);
    } catch (error) {
      console.error("Error create skills section:", error);
      res.status(500).json({
        error: "error is created the skills section.",
      });
    }
  },
  async getAllEditSkills(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const EditSkills = await Editskills.find({ user: userId });
      res.status(200).json({ EditSkills });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "get Internal server error" });
    }
  },
  async UpdateEditSkills(req: any, res: Response) {
    try {
      const userId = req.params.id;
      const updatedEditSkills = req.body;
      const EditSkills = await Editskills.findByIdAndUpdate(
        userId,
        updatedEditSkills,
        {
          new: true,
        }
      );
      if (EditSkills) {
        res.status(200).json(EditSkills);
      } else {
        res.status(404).json({ error: "project is not found." });
      }
    } catch (error) {
      console.error("Error updating project details:", error);
      res.status(500).json({
        error: "An error occurred while updating project details.",
      });
    }
  },
};
export default createEditSkillsController;
