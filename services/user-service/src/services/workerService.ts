import { UploadedFile } from "express-fileupload";
import { User } from "../models/user.model.js";
import { AppError } from "../utils/appError.js";
import { fileUpload } from "../utils/cloudUpload.js";
import CONFIG from "../config/dotenv.congif.js";

interface IBecomeWorker {
  authUserId: string;
  phone: string;
  profileImage: UploadedFile;
  bio: string;
  skills: string[];
  experience: string;
  serviceCategories: string;
  address: string;
  panNumber: string;
  adharNumber: string;
  citizanShip: string;
  nativeLanguge: string;
}

export const becomeWorkerService = async (data: IBecomeWorker) => {
  const {
    authUserId,
    phone,
    profileImage,
    bio,
    skills,
    experience,
    serviceCategories,
    address,
    panNumber,
    adharNumber,
    citizanShip,
    nativeLanguge,
  } = data;

  const user = await User.findOne({ authUserId });

  if (!user) {
    throw new AppError(404, "user not found");
  }

  //

  if (user.role === "Service Provider") {
    throw new AppError(
      400,
      "You are already registered as a Service Provider.",
    );
  }

  if (user.workerApplicationStatus === "pending") {
    throw new AppError(
      400,
      "Your service provider application is already under review.",
    );
  }

  if (user.workerApplicationStatus === "rejected") {
    throw new AppError(
      400,
      "Your previous application was rejected. Please submit a new application.",
    );
  }

  const uploadeToCloudinary = await fileUpload(
    profileImage,
    CONFIG.CLOUD_FOLDER_NAME,
  );

  const createWorker = await User.findOneAndUpdate(
    { authUserId },
    {
      phone,
      profileImage: uploadeToCloudinary?.secure_url,
      bio,
      skills,
      experience,
      serviceCategories,
      address,
      panNumber,
      adharNumber,
      citizanShip,
      nativeLanguge,
    },
    { returnDocument: "after" },
  );

  return createWorker;
};
