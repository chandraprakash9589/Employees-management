import express from "express";
import changeStatusController from "../controllers/changeStatus";

const router = express.Router();

router.post("/:id", changeStatusController.createchangeStatus);
router.get("/:id", changeStatusController.getUserChangeStatus);
router.put("/:id", changeStatusController.UpdateChangeStatus);
export default router;
