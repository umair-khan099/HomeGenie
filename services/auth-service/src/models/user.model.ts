import mongoose from "mongoose";

interface IUser {
  fullName: string;
  email: string;
  password: string;
  role: "Customer" | "Service Provider" | "Admin";
  resetToken: string;
  resetTokenExp: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, "fullName feild is missiing"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Email feild is  missing"],
    },
    password: {
      type: String,
      required: [true, "password feild is missing  "],
      select: false,
    },
    role: {
      type: String,
      enum: ["Customer", "Service Provider", "Admin"],
      default: "Customer",
    },
    resetToken: {
      type: String,
    },
    resetTokenExp: {
      type: String,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUser>("user", userSchema);
