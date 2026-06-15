import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendEmailService } from "../services/otp.service.js";
import { AppResponse } from "../utils/appResponse.js";
import {
  forgetPasswordOtpService,
  forgtePasswordVerifyOtpService,
  loginService,
  resetPasswordService,
  rotateRefreshToken,
  signUpService,
  updatePasswordService,
} from "../services/auth.service.js";
import { AppError } from "../utils/appError.js";
import { options } from "../utils/genrateToken.js";

export const sendEmailController = asyncHandler(
  async (req: Request, res: Response) => {
    const response = await sendEmailService(req.body);
    res.status(200).json(new AppResponse(200, null, "user otp send"));
  },
);

export const signUpController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await signUpService(req.body);

    res
      .status(200)
      .cookie("refreshToken", result.refreshToken, options)
      .json(
        new AppResponse(
          200,
          { user: result.userRes },
          "user login successfully",
        ),
      );
  },
);

export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await loginService(req.body);

    res
      .status(200)
      .cookie("refreshToken", result.refreshToken, options)
      .json(
        new AppResponse(
          200,
          { user: result.userRes },
          "user login successfully",
        ),
      );
  },
);

export const forgetPasswordOtpController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const result = await forgetPasswordOtpService(email);

    res
      .status(200)
      .json(new AppResponse(200, { result }, "Otp send successfully"));
  },
);

export const forgtePasswordVerifyOtpController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    const result = await forgtePasswordVerifyOtpService(email, otp);

    res.status(200).json(new AppResponse(200, { result }, "otp verifyed "));
  },
);

export const resetPasswordController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await resetPasswordService(req.body);

    res
      .status(200)
      .json(new AppResponse(200, { result }, "password reset successfull"));
  },
);

export const updatePasswordController = asyncHandler(
  async (req: Request, res: Response) => {
    const userHeader = req.header("user_id");

    if (!userHeader) {
      throw new AppError(401, "Unauthorized");
    }

    const user = JSON.parse(userHeader);

    const { oldPassword, newPassword } = req.body;

    const result = await updatePasswordService({
      userId: user.userId,
      oldPassword,
      newPassword,
    });

    res
      .status(200)
      .json(new AppResponse(200, { result }, "password updated successfully"));
  },
);

export const rotateRefreshTokenController = asyncHandler(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError(400, "UnAuthorized");
    }
    const result = await rotateRefreshToken(refreshToken);

    res
      .status(200)
      .cookie("refreshToken", result.newRefreshToken)
      .json(
        new AppResponse(
          200,
          { accessToken: result.accessToken },
          "refreshToken rotate successfully",
        ),
      );
  },
);
