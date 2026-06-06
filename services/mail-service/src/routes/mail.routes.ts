import { Router } from "express";
import { sendMail } from "../controllers/mail.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { sendMailSchema } from "../validation/sendMail.validate.js";

export const mailRouter = Router();

mailRouter.post("/send-mail", validate(sendMailSchema), sendMail);
