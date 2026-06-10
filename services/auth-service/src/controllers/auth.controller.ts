import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendEmailService } from "../services/otp.service.js";
import { AppResponse } from "../utils/appResponse.js";
import {
  forgetPasswordOtpService,
  forgtePasswordVerifyOtpService,
  loginService,
  signUpService,
} from "../services/auth.service.js";

export const sendEmailController = asyncHandler(
  async (req: Request, res: Response) => {
    const response = await sendEmailService(req.body);
    res.status(200).json(new AppResponse(200, { response }, "user otp send"));
  },
);

export const signUpController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await signUpService(req.body);

    res
      .status(200)
      .cookie("token", result.token)
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
    console.log(req.body);
    const result = await loginService(req.body);

    res
      .status(200)
      .cookie("token", result.token)
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
