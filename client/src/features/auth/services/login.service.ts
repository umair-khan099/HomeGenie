import { login } from "../../../api/auth";
import type { loginPayload } from "../../../types/auth.type";

export const loginInService = async (data: loginPayload) => {
  const response = await login(data);
  if (!response?.data?.success) {
    throw new Error("Somthing went wrong at logIn");
  }
  return response.data;
};
