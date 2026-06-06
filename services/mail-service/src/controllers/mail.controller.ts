import express, { Request, Response } from "express";
import { AppResponse } from "../utils/appResponse.js";
import { sendMailService } from "../services/mail.service.js";

export const sendMail = async (req: Request, res: Response) => {
  try {
    // fetch data
    const { email, subject, body, from } = req.body;

    const mailSend = await sendMailService({ email, subject, body, from });
    res.status(200).json(new AppResponse("otp send successfully", {mailSend}, 200));
  } catch (error: any) {
    console.log(error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Intenal server error",
    });
  }
};
