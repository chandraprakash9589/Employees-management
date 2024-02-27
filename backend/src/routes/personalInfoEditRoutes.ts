import express from "express";
import UpdatePersonalInfoController from "../controllers/personalInfoEditController";
const router = express.Router();
router.post("/", UpdatePersonalInfoController.createPersonalInfo);
router.put("/:id", UpdatePersonalInfoController.updatePersonalInfo);
router.get("/", UpdatePersonalInfoController.getAllPersonalInfo);
export default router;
