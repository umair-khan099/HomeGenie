import z from "zod";

export const registerSchema = z.object({
  fullName: z.string().trim().min(3),
  email: z.string().email().trim(),
  password: z.string().min(6),
  role: z.enum(["User", "Worker", "Admin"]).optional(),
});
