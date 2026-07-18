import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    authUserId: {
      type: String,
      required: true,
      index: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      match: /^[0-9]{10}$/,
    },

    profileImage: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["Customer", "Service Provider", "Admin"],
      default: "Customer",
    },

    skills: {
      type: [String],
      default: [],
    },

    experience: {
      type: Number,
      default: 0,
      min: 0,
    },

    serviceCategories: {
      type: [String],
      default: [],
    },

    isAvailable: {
      type: Boolean,
      default: false,
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalJobsCompleted: {
      type: Number,
      default: 0,
      min: 0,
    },

    address: {
      type: String,
      trim: true,
    },

    isVerifiedWorker: {
      type: Boolean,
      default: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    lastActiveAt: {
      type: Date,
      default: Date.now,
    },
    // worker related main data
    workerApplicationStatus: {
      type: String,
      enum: ["pending", "rejected", "accepted"],
      default: "pending",
    },

    panNumber: {
      type: String,
    },
    adharNumber: {
      type: String,
    },

    citizanShip: {
      type: String,
    },
    nativeLanguge: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

type IUser = InferSchemaType<typeof userSchema>;
export const User = model<IUser>("User", userSchema);
