import express from "express";
import CallsController from "../controllers/callsController";
const router = express.Router();

router.post("/:id", CallsController.createCalls);
// router.put("/:id", ProjectUpdateController.UpdateProject);
router.get("/:id", CallsController.getAllUserCalls);
// router.delete("/:id", ProjectUpdateController.deleteProject);

export default router;
