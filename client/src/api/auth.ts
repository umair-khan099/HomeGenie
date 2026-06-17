import type { signUpPayload } from "../types/auth.type";
import api from "./axios";

export const SignUpMailApi = async (data: signUpPayload) => {
  return await api.post("/auth/send-mail", data);
};

export const SignUp = async (data: signUpPayload) => {
  return await api.post("/auth/sign-up", data);
};
