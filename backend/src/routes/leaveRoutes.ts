import express from "express";
import createLeaveController from "../controllers/leaveController";
const router = express.Router();

router.post("/:id", createLeaveController.createLeave);
router.get("/:id", createLeaveController.getAllLeaveOfUser);
router.delete("/:id", createLeaveController.deleteLeave);
router.put("/cancel/:id", createLeaveController.cancelLeave);
router.get("/", createLeaveController.getLeaveRequests);
router.put("/approve/:id", createLeaveController.approveLeave);

export default router;
