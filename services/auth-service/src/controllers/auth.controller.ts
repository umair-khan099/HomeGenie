import express, { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendEmailService } from "../services/auth.service.js";
import { AppResponse } from "../utils/appResponse.js";

export const sendEmailController = asyncHandler(async (req: Request, res: Response) => {
  const response = await sendEmailService(req.body);
  res.status(200).json(new AppResponse(200, { response }, "user otp send"));
});
