import express from "express";
import userController from "../controllers/userContoller";
import { newUserValidator } from "../middleware/validator";
const router = express.Router();
router.post("/signup", newUserValidator, userController.signUp);
router.get("/getUserDetails/:id", userController.getEditpersonalDetails);
router.put("/UpdateUserDetails/:id", userController.UpdatePersonalDetails);
router.delete("/deleteUser/:id", userController.deleteUser);

export default router;
