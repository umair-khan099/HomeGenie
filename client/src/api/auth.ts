import type { loginPayload, signUpPayload } from "../types/auth.type";
import api from "./axios";

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
