import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { registerSchema } from "../validation/auth.validation.js";
import { sendEmailController } from "../controllers/auth.controller.js";
// import { registerUser } from "../services/auth.service.js";

export const authRouter = Router();

authRouter.post("/send-mail", validate(registerSchema), sendEmailController);
