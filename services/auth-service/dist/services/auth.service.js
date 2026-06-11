var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import CONFIG from "../config/config.js";
import { Otp } from "../models/otp.model.js";
import { User } from "../models/user.model.js";
import { mailTemplate } from "../template/mail.template.js";
import { AppError } from "../utils/appError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import crypto from "node:crypto";
export const signUpService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password, role, otp } = userData;
    const isUserRegister = yield User.findOne({ email });
    if (isUserRegister) {
        throw new AppError(404, "Email Already Registered");
    }
    const latestOtp = yield Otp.findOne({ email }).sort({ createdAt: -1 });
    if (!latestOtp) {
        throw new AppError(404, "Otp expires");
    }
    if (latestOtp.otp !== otp) {
        throw new AppError(422, "incorrect otp");
    }
    const hashPassword = yield bcrypt.hash(password, 10);
    const user = yield User.create({
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
});
export const loginService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = userData;
    const user = yield User.findOne({ email }).select("+password");
    if (!user) {
        throw new AppError(404, "user no exist ");
    }
    const isPasswordCorrect = yield bcrypt.compare(password, user.password);
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
});
export const forgetPasswordOtpService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const isUserExist = yield User.findOne({ email });
    if (!isUserExist) {
        throw new AppError(404, "user not fount");
    }
    const otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });
    const newOtp = yield Otp.create({ email, otp });
    const mailData = {
        email: email,
        subject: "For otp verification",
        body: mailTemplate(otp),
        from: "HomeGenie",
    };
    try {
        const response = yield axios.post("http://localhost:8000/api/v1/send-mail", mailData);
        return newOtp;
    }
    catch (err) {
        console.log(err.code);
        console.log(err.message);
        console.log((_a = err.response) === null || _a === void 0 ? void 0 : _a.data);
    }
});
export const forgtePasswordVerifyOtpService = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const latestOtp = yield Otp.findOne({ email }).sort({ createdAt: -1 });
    if (!latestOtp) {
        throw new AppError(404, "otp has expired");
    }
    if (latestOtp.otp !== otp) {
        throw new AppError(404, "Incorrect otp ");
    }
    const token = crypto.randomBytes(32).toString("hex");
    const updatedUser = yield User.findOneAndUpdate({ email }, {
        resetToken: token,
        resetTokenExp: Date.now() + 10 * 60 * 1000,
    }, { new: true });
    return updatedUser;
});
export const resetPasswordService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, password } = data;
    const userDetails = yield User.findOne({ resetToken: token });
    if (!(userDetails === null || userDetails === void 0 ? void 0 : userDetails.resetTokenExp) ||
        String(Date.now()) > userDetails.resetTokenExp) {
        throw new Error("Reset token expired");
    }
    const hashPassword = yield bcrypt.hash(password, 10);
    const updatedUser = yield User.findOneAndUpdate({ resetToken: token }, { password: hashPassword, resetToken: "", resetTokenExp: "" }, { returnDocument: "after" });
    return updatedUser;
});
export const updatePasswordService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, oldPassword, newPassword } = data;
    const isUserExist = yield User.findById({ _id }).select("+password");
    if (!isUserExist) {
        throw new AppError(404, "user not found");
    }
    const isPasswordCorrect = yield bcrypt.compare(isUserExist.password, oldPassword);
    if (!isPasswordCorrect) {
        throw new AppError(400, "password is not correct");
    }
    const hashPassword = yield bcrypt.hash(newPassword, 10);
    const updatePassword = yield User.findByIdAndUpdate({ _id }, {
        password: hashPassword,
    }, { new: true });
    return updatePassword;
});
