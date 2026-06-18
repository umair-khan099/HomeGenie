import {
  forgetPassword,
  forgetPasswordGetOtp,
  forgetPasswordVerifyOtp,
} from "../../../api/auth";
import type { forgetPasswordPayload } from "../../../types/auth.type";

export const forgetPasswordGetOptService = async (email: string) => {
  const response = await forgetPasswordGetOtp(email);

  if (!response?.data?.success) {
    throw new Error("Somthing went wrong at forget Password Get Opt Service");
  }
  return response.data;
};

export const forgetPasswordVerifyOtpService = async (
  email: string,
  otp: string,
) => {
  const response = await forgetPasswordVerifyOtp(email, otp);

  if (!response?.data?.success) {
    throw new Error(
      "Somthing went wrong at forget Password Verify Opt Service",
    );
  }
};

export const forgetPasswordService = async (data: forgetPasswordPayload) => {
  const response = await forgetPassword(data);

  if (!response?.data?.success) {
    throw new Error("Somthing went wrong at forget Password  Service");
  }

  return response.data;
};
