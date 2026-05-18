import mongoose from "mongoose";

interface IOtp {
  email: string;
  otp: string;
}

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: [true, "otp is requiredd"],
  },
});

export const Otp = mongoose.model<IOtp>("ots", otpSchema);
