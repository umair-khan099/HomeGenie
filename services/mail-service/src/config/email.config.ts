import nodemailer from "nodemailer";
import { CONFIG } from "./dotenv.config.js";

export const transpoter = nodemailer.createTransport({
  host: CONFIG.MAIL_HOST,
  auth: {
    user: CONFIG.MAIL_USER,
    pass: CONFIG.MAIL_PASS,
  },
});
