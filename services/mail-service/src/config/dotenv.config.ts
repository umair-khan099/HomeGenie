import dotenv from "dotenv";
dotenv.config();

if (!process.env.PORT) {
  console.log("missing PORT from .env");
}
if (!process.env.MAIL_HOST) {
  console.log("missing MAIL_HOST from .env");
}
if (!process.env.MAIL_USER) {
  console.log("missing MAIL_USER from .env");
}
export const CONFIG = {
  PORT: process.env.PORT,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
};
