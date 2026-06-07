import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import {
  registerAndOtpSchema,
  registerSchema,
} from "../validation/auth.validation.js";
import {
  sendEmailController,
  signUpUser,
} from "../controllers/auth.controller.js";
// import { registerUser } from "../services/auth.service.js";

export const authRouter = Router();

authRouter.post("/send-mail", validate(registerSchema), sendEmailController);
authRouter.post("/sign-up", validate(registerAndOtpSchema), signUpUser);
