import axios from "axios";
import CONFIG from "../config/config.js";
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
import { getRedisClient } from "../config/redis.config.js";
import { generateToken } from "../utils/genrateToken.js";
import { sendOtpProducer } from "../producer/sendOtpProducer.js";
import { createProfileProducer } from "../producer/profileProducer.js";

export const signUpService = async (userData: ISignUpData) => {
  const { fullName, email, password, role, otp } = userData;

  const isUserRegister = await User.findOne({ email });
  if (isUserRegister) {
    throw new AppError(404, "Email Already Registered");
  }
  const client = getRedisClient();
  const latestOtp = await client.get(`signUp_otp:${email}`);

  if (!latestOtp) {
    throw new AppError(404, "Otp expires");
  }

  if (latestOtp !== otp) {
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

  createProfileProducer({ fullName, role, email, authUserId: user._id });
  const payLoad = {
    userId: user._id,
    role: user.role,
    email: user.email,
  };

  const accessToken = generateToken(payLoad, CONFIG.ACCESS_TOKEN_SECRET, "15m");
  const refreshToken = generateToken(
    { userId: user._id },
    CONFIG.REFRESH_TOKEN_SECRET,
    "10d",
  );
  await client.set(`session:${user._id}`, refreshToken, {
    EX: 864000,
  });

  const userRes = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    accessToken: accessToken,
  };

  return { userRes, accessToken, refreshToken };
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
    userId: user._id,
    role: user.role,
    email: user.email,
  };
  const accessToken = generateToken(payLoad, CONFIG.ACCESS_TOKEN_SECRET, "15m");
  const refreshToken = generateToken(
    { userId: user._id },
    CONFIG.REFRESH_TOKEN_SECRET,
    "10d",
  );

  const client = getRedisClient();
  await client.set(`session:${user._id}`, refreshToken, {
    EX: 864000,
  });
  const userRes = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    accessToken: accessToken,
  };

  return { userRes, accessToken, refreshToken };
};

export const forgetPasswordOtpService = async (email: string) => {
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(404, "user not found");
  }

  const otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  const client = getRedisClient();
  await client.set(`forgetPasswordOtp:${email}`, otp, {
    EX: 600,
  });

  const mailData = {
    email: email,
    subject: "For otp verification",
    body: mailTemplate(otp),
    from: "HomeGenie",
  };

  sendOtpProducer(mailData);
};

export const forgtePasswordVerifyOtpService = async (
  email: string,
  otp: string,
) => {
  const client = getRedisClient();
  const latestOtp = await client.get(`forgetPasswordOtp:${email}`);

  if (!latestOtp) {
    throw new AppError(404, "otp has expired");
  }

  if (latestOtp !== otp) {
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
    throw new AppError(400, "Reset token expired");
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
  const { userId, oldPassword, newPassword } = data;
  const isUserExist = await User.findById(userId).select("+password");

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
    userId,
    {
      password: hashPassword,
    },
    { returnDocument: "after" },
  );

  return updatePassword;
};

export const rotateRefreshToken = async (refreshToken: string) => {
  const decoded = jwt.verify(refreshToken, CONFIG.REFRESH_TOKEN_SECRET);
  if (!decoded) {
    throw new AppError(404, "unAuthorized refresh token not found");
  }
  if (typeof decoded === "string") {
    throw new AppError(401, "Invalid refresh token");
  }

  const userId = decoded.userId;

  // redis client
  const client = getRedisClient();
  const storedToken = await client.get(`session:${userId}`);

  if (!storedToken || storedToken !== refreshToken) {
    throw new AppError(403, "session Expired");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, "user not found");
  }
  const payLoad = {
    userId: user?._id,
    role: user?.role,
    email: user?.email,
  };
  const accessToken = generateToken(payLoad, CONFIG.ACCESS_TOKEN_SECRET, "15m");
  const newRefreshToken = generateToken(
    { userId: user._id },
    CONFIG.REFRESH_TOKEN_SECRET,
    "10d",
  );

  await client.set(`session:${user._id}`, newRefreshToken, { EX: 864000 });
  return { accessToken, newRefreshToken };
};
