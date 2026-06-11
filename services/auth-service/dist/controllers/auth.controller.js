var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendEmailService } from "../services/otp.service.js";
import { AppResponse } from "../utils/appResponse.js";
import { forgetPasswordOtpService, forgtePasswordVerifyOtpService, loginService, resetPasswordService, signUpService, updatePasswordService, } from "../services/auth.service.js";
import { AppError } from "../utils/appError.js";
export const sendEmailController = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield sendEmailService(req.body);
    res.status(200).json(new AppResponse(200, { response }, "user otp send"));
}));
export const signUpController = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield signUpService(req.body);
    res
        .status(200)
        .cookie("token", result.token)
        .json(new AppResponse(200, { user: result.userRes }, "user login successfully"));
}));
export const loginController = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const result = yield loginService(req.body);
    res
        .status(200)
        .cookie("token", result.token)
        .json(new AppResponse(200, { user: result.userRes }, "user login successfully"));
}));
export const forgetPasswordOtpController = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const result = yield forgetPasswordOtpService(email);
    res
        .status(200)
        .json(new AppResponse(200, { result }, "Otp send successfully"));
}));
export const forgtePasswordVerifyOtpController = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    const result = yield forgtePasswordVerifyOtpService(email, otp);
    res.status(200).json(new AppResponse(200, { result }, "otp verifyed "));
}));
export const resetPasswordController = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield resetPasswordService(req.body);
    res
        .status(200)
        .json(new AppResponse(200, { result }, "password reset successfull"));
}));
export const updatePasswordController = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = req.body;
    if (!req.user || typeof req.user === "string" || !("_id" in req.user)) {
        throw new AppError(401, "Unauthorized");
    }
    const { _id } = req.user;
    const result = yield updatePasswordService({
        _id,
        oldPassword,
        newPassword,
    });
    res
        .status(200)
        .json(new AppResponse(200, { result }, "password updated successfully"));
}));
