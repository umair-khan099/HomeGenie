import { Router } from "express";
import {
  createProfileController,
  getprofileController,
  updateProfileController,
  updateProfilePictureController,
} from "../controllers/profileCntroller.js";

export const profileRouter = Router();

profileRouter.post("/profile", createProfileController);
profileRouter.get("/get-profile", getprofileController);
profileRouter.patch("/update-profile-picture", updateProfilePictureController);
profileRouter.patch("/update-profile", updateProfileController);
