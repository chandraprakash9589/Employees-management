import express from "express";
import HoliDaysController from "../controllers/holidaysController";
const router = express.Router();

router.post("/", HoliDaysController.createHoliDays);
router.put("/:id", HoliDaysController.UpdateHoliDays);
router.get("/", HoliDaysController.getAllUserHoliDays);
router.delete("/:id", HoliDaysController.deleteHoliDays);

export default router;
