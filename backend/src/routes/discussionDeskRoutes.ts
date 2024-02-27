import express from "express";
import UpdateDiscussionDeskController from "../controllers/discussionDeskController";
const router = express.Router();

router.post("/:id", UpdateDiscussionDeskController.createDiscussionDesk);
router.put("/:id", UpdateDiscussionDeskController.updateDiscussionDesk);
router.get("/:id", UpdateDiscussionDeskController.getDiscussionDesk);
router.delete("/:id", UpdateDiscussionDeskController.deletediscussion);

export default router;
