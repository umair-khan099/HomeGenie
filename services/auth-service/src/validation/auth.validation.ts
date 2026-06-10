import z from "zod";
import { forgetPasswordOtpController } from "../controllers/auth.controller.js";

export const registerSchema = z.object({
  fullName: z.string().trim().min(3),
  email: z.string().trim().email(),
  password: z.string().min(6),
  role: z.enum(["User", "Worker", "Admin"]).optional(),
});

export const registerAndOtpSchema = z.object({
  fullName: z.string().trim().min(3),
  email: z.string().trim().email(),
  password: z.string().min(6),
  role: z.enum(["User", "Worker", "Admin"]).optional(),
  otp: z.string().min(4).max(4),
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6),
});

export const forgetPasswordSchema = z.object({
  email: z.string().trim().email(),
});
export const forgetPasswordOtpVerifySchema = z.object({
  email: z.string().trim().email(),
  otp: z.string().min(4).max(4),
});
