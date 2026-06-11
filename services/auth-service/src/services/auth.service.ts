import axios from "axios";
import CONFIG from "../config/config.js";
import { Otp } from "../models/otp.model.js";
import { User } from "../models/user.model.js";
import { mailTemplate } from "../template/mail.template.js";
import { AppError } from "../utils/appError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import {
  ILoginData,
  IResetPassword,
  ISignUpData,
  IUpdatePassword,
} from "../types/auth.types.js";
import crypto from "node:crypto";

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

export const loginService = async (userData: ILoginData) => {
  const { email, password } = userData;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError(404, "user no exist ");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new AppError(422, "password is incorrect");
  }
  const payLoad = {
    _id: user._id,
    role: user.role,
    email: user.email,
  };
  const token = jwt.sign(payLoad, CONFIG.JWT_SECRET);

  const userRes = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  };

  return { userRes, token };
};

export const forgetPasswordOtpService = async (email: string) => {
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(404, "user not fount");
  }

  const otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  const newOtp = await Otp.create({ email, otp });

  const mailData = {
    email: email,
    subject: "For otp verification",
    body: mailTemplate(otp),
    from: "HomeGenie",
  };
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/send-mail",
      mailData,
    );
    return newOtp;
  } catch (err: any) {
    console.log(err.code);

    console.log(err.message);

    console.log(err.response?.data);
  }
};

export const forgtePasswordVerifyOtpService = async (
  email: string,
  otp: string,
) => {
  const latestOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });

  if (!latestOtp) {
    throw new AppError(404, "otp has expired");
  }

  if (latestOtp.otp !== otp) {
    throw new AppError(404, "Incorrect otp ");
  }
  const token = crypto.randomBytes(32).toString("hex");

  const updatedUser = await User.findOneAndUpdate(
    { email },
    {
      resetToken: token,
      resetTokenExp: Date.now() + 10 * 60 * 1000,
    },
    { new: true },
  );

  return updatedUser;
};

export const resetPasswordService = async (data: IResetPassword) => {
  const { token, password } = data;

  const userDetails = await User.findOne({ resetToken: token });

  if (
    !userDetails?.resetTokenExp ||
    String(Date.now()) > userDetails.resetTokenExp
  ) {
    throw new Error("Reset token expired");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const updatedUser = await User.findOneAndUpdate(
    { resetToken: token },
    { password: hashPassword, resetToken: "", resetTokenExp: "" },
    { returnDocument: "after" },
  );
  return updatedUser;
};

export const updatePasswordService = async (data: IUpdatePassword) => {
  const { _id, oldPassword, newPassword } = data;
  const isUserExist = await User.findById({ _id }).select("+password");

  if (!isUserExist) {
    throw new AppError(404, "user not found");
  }
  const isPasswordCorrect = await bcrypt.compare(
    oldPassword,
    isUserExist.password,
  );

  if (!isPasswordCorrect) {
    throw new AppError(400, "password is not correct");
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);

  const updatePassword = await User.findByIdAndUpdate(
    { _id },
    {
      password: hashPassword,
    },
    { returnDocument: "after" },
  );

  return updatePassword;
};
