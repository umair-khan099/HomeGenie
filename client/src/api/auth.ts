import api from "./axios";
import type {
  forgetPasswordPayload,
  loginPayload,
  signUpPayload,
} from "../types/auth.type";

export const SignUpMailApi = async (data: signUpPayload) => {
  return await api.post("/auth/send-mail", data);
};

export const SignUp = async (data: signUpPayload) => {
  return await api.post("/auth/sign-up", data);
};

export const login = async (data: loginPayload) => {
  return await api.post("/auth/login", data);
};

export const forgetPasswordGetOtp = async (email: string) => {
  return await api.post("/auth/forget-password", email);
};

export const forgetPasswordVerifyOtp = async (email: string, otp: string) => {
  return await api.post("/auth/forget-password-otp-verify", { email, otp });
};

export const forgetPassword = async (data: forgetPasswordPayload) => {
  return await api.post("/auth/reset-password", data);
};
