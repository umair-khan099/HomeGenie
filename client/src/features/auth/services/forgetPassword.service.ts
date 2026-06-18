import { forgetPasswordGetOtp } from "../../../api/auth";

export const forgetPasswordGetOptService = async (email: string) => {
  const response = await forgetPasswordGetOtp(email);

  if (!response?.data?.success) {
    throw new Error("Somthing went wrong at forget Password Get Opt Service");
    return response.data;
  }
};
