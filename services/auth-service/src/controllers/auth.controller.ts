import express, { Request, Response } from "express";
import { AppError } from "../utils/appError.js";
import { generate } from "otp-generator";
import { registerUser } from "../services/auth.service.js";

const signUp = async (req: Request, res: Response) => {
  try {
    // client data
    const { fullName, email, password, role } = req.body;

    // validation
    if (!fullName || !email || !password || !role) {
      throw new AppError("please fill all input fields", 400);
    }

    if (password.length < 8) {
      throw new AppError("Password must be atlist 8 charectors", 422);
    }

    // service call
    const newOtp = await registerUser({ fullName, email, password, role });
    
  } catch (error: any) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal  servor error",
    });
  }
};
