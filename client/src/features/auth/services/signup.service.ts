import { SignUpMailApi } from "../../../api/auth";
import type { signUpPayload } from "../../../types/auth.type";

export const signUpMailOtpSendService = async (data: signUpPayload) => {
  const response = await SignUpMailApi(data);

  if (!response?.data?.success) {
    throw new Error("Somthing went worng at sending signUp OTP");
  }

  return response.data;
};
