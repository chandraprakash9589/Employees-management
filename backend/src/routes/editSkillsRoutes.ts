import express from "express";
import createEditSkillsController from "../controllers/editSkillsController";
const router = express.Router();
router.post("/:id", createEditSkillsController.createEditSkills);
router.put("/:id", createEditSkillsController.UpdateEditSkills);
router.get("/:id", createEditSkillsController.getAllEditSkills);
export default router;
