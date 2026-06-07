import CONFIG from "../config/config.js";
import { Otp } from "../models/otp.model.js";
import { User } from "../models/user.model.js";
import { AppError } from "../utils/appError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface ISignUpData {
  fullName: string;
  email: string;
  password: string;
  role: "User" | "Worker" | "Admin";
  otp: string;
}

export const signUpService = async (userData: ISignUpData) => {
  const { fullName, email, password, role, otp } = userData;

  const isUserRegister = await User.findOne({ email });
  if (isUserRegister) {
    throw new AppError(404, "Email Already Registered");
  }

  const latestOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });

  if (!latestOtp) {
    throw new AppError(404, "Otp expires");
  }

  if (latestOtp.otp !== otp) {
    throw new AppError(422, "incorrect otp");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    email,
    password: hashPassword,
    role,
  });

  if (!user) {
    throw new AppError(500, "user registration failed");
  }

  const payLoad = {
    _id: user._id,
    role: user.role,
    email: user.email,
  };
  const userRes = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payLoad, CONFIG.JWT_SECRET, { expiresIn: "10d" });

  return { userRes, token };
};
