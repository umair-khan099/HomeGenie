import z from "zod";

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
