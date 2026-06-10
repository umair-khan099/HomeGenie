import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import {
  forgetPasswordOtpVerifySchema,
  forgetPasswordSchema,
  loginSchema,
  registerAndOtpSchema,
  registerSchema,
} from "../validation/auth.validation.js";
import {
  forgetPasswordOtpController,
  forgtePasswordVerifyOtpController,
  loginController,
  sendEmailController,
  signUpController,
} from "../controllers/auth.controller.js";
// import { registerUser } from "../services/auth.service.js";

export const authRouter = Router();

authRouter.post("/send-mail", validate(registerSchema), sendEmailController);
authRouter.post("/sign-up", validate(registerAndOtpSchema), signUpController);
authRouter.post("/login", validate(loginSchema), loginController);
authRouter.post(
  "/forget-password",
  validate(forgetPasswordSchema),
  forgetPasswordOtpController,
);
authRouter.post(
  "/forget-password-otp-verify",
  validate(forgetPasswordOtpVerifySchema),
  forgtePasswordVerifyOtpController,
);
