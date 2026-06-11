import mongoose from "mongoose";
const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: [true, "otp required"],
        match: /^\d{4}$/,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5,
    },
});
export const Otp = mongoose.model("Otp", otpSchema);
