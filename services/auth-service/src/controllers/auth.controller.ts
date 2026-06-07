import express, { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendEmailService } from "../services/otp.service.js";
import { AppResponse } from "../utils/appResponse.js";
import { ISignUpData, signUpService } from "../services/auth.service.js";

export const sendEmailController = asyncHandler(
  async (req: Request, res: Response) => {
    const response = await sendEmailService(req.body);
    res.status(200).json(new AppResponse(200, { response }, "user otp send"));
  },
);

export const signUpUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await signUpService(req.body);

  res
    .status(200)
    .cookie("token", result.token)
    .json(new AppResponse(200, { user: result.userRes }));
});
