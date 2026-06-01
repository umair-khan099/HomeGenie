import mongoose from "mongoose";
import { maxLength } from "zod";

interface IOtp {
  email: string;
  otp: string;
  createdAt:Date
}

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: [true, "otp is requiredd"],
    maxLength: 4,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

export const Otp = mongoose.model<IOtp>("otp", otpSchema);
