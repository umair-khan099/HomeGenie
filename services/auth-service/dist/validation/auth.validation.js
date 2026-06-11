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
export const resetPasswordSchema = z
    .object({
    token: z.string(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
})
    .refine((data) => data.password !== data.confirmPassword, {
    message: "confirm password not match to password",
    path: ["confirmPassword"],
});
export const updatePasswordSchema = z
    .object({
    oldPassword: z.string().min(6),
    newPassword: z.string().min(6),
    confirmNewPassword: z.string().min(6),
})
    .refine((data) => data.oldPassword === data.newPassword, {
    message: "New Password must be diffrent from old password",
    path: ["newPasswword"],
})
    .refine((data) => data.newPassword !== data.confirmNewPassword, {
    message: "confirm password not match to password",
    path: ["newPassword"],
});
