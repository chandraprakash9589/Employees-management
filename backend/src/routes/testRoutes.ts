import express from "express";
import TestController from "../controllers/testController";
const router = express.Router();

router.post("/:id", TestController.createTests);
// router.put("/:id", ProjectUpdateController.UpdateProject);
router.get("/:id", TestController.getAllUserTests);

// router.delete("/:id", ProjectUpdateController.deleteProject);

export default router;
