import { Request, Response } from "express";
import Project from "../models/project";

const ProjectUpdateController = {
  async createProject(req: Request, res: Response) {
    try {
      const task = await Project.create(req.body);
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ error: "Task not found." });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  },
  async getAllUserProject(req: any, res: Response) {
    try {
    
      const userId = req.params.id;
      const projects = await Project.find({ user: userId });
      res.status(200).json({ projects });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async UpdateProject(req: any, res: Response) {
    try {
      const userId = req.params.id;
      const updatedProject = req.body;
      const userProject = await Project.findByIdAndUpdate(
        userId,
        updatedProject,
        {
          new: true,
        }
      );
      if (userProject) {
        res.status(200).json(userProject);
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
  async deleteProject(req: any, res: Response) {
    try {
      const userId = req.params.id;
      const updatedProject = req.body;
      const userProject = await Project.findByIdAndDelete(
        userId,
        updatedProject
      );
      if (userProject) {
        res.status(200).json({ message: "Project deleted successfully" });
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
export default ProjectUpdateController;
