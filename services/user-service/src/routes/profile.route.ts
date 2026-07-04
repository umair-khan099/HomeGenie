import { Router } from "express";
import { createProfileController } from "../controllers/profileCntroller.js";

export const profileRouter = Router();

profileRouter.post("/profile", createProfileController);
