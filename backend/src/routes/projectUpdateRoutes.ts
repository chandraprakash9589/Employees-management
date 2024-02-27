import express from "express";
import ProjectUpdateController from "../controllers/updateProject";
const router = express.Router();

router.post("/:id", ProjectUpdateController.createProject);
router.put("/:id", ProjectUpdateController.UpdateProject);
router.get("/:id", ProjectUpdateController.getAllUserProject);
router.delete("/:id", ProjectUpdateController.deleteProject);

export default router;
