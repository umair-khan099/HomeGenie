import { Otp } from "../models/otp.model.js";
import { User } from "../models/user.model.js";
import { AppError } from "../utils/appError.js";
import otp from "otp-generator";

interface IUserData {
  fullName: string;
  email: string;
  password: string;
  role: "User" | "Worker" | "Admin";
}

export const sendEmailService = async (userData: IUserData) => {
  const { email } = userData;

  const isExist = await User.findOne({ email });

  if (isExist) {
    throw new AppError(409, "User already Exist , Please login");
  }

  const newOtp = otp.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  const otpDoc = await Otp.create({ email, otp: newOtp });

  return otpDoc;
};
