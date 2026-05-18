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

export const registerUser = async (data: IUserData) => {
  const { fullName, email, password, role } = data;

  //    fin user in db is it already exist
  const isExist = await User.findOne({ email });

  if (isExist) {
    throw new AppError("Email Already Register", 409);
  }

  // generate Otp
  const newOtp = otp.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  //   save  otp in db
  const storeOtp = await Otp.create({
    email,
    otp: newOtp,
  });

  return storeOtp;
};
