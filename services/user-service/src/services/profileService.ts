import { UploadedFile } from "express-fileupload";
import { User } from "../models/user.model.js";
import { AppError } from "../utils/appError.js";
import { fileUpload } from "../utils/cloudUpload.js";

interface ICreateProfile {
  fullName: string;
  authUserId: string;
  email: string;
  profileImage: string;
}
interface IUpdateProfile {
  authUserId: string;
  fullName: string;
  bio: string;
  profileImage: UploadedFile;
  phone: string;
  skills: string[];
  experience: number;
  serviceCategories: string[];
}
interface IUpdateProfilePicture {
  authUserId: string;
  profileImage: UploadedFile;
}

export const createProfileService = async (data: ICreateProfile) => {
  const { fullName, authUserId, email, profileImage } = data;

  // cheak if the user exist already

  console.log("Incoming Data:", data);

  const isProfileExist = await User.findOne({ authUserId });

  console.log("Existing Profile:", isProfileExist);

  const existingEmail = await User.findOne({ email });

  console.log("Existing Email:", existingEmail);
  // create profile

  const profile = await User.create({
    fullName,
    authUserId,
    email,
    profileImage,
  });

  return profile;
};

export const getProfileService = async (userId: string) => {
  const profile = await User.findOne({ authUserId: userId });

  return profile;
};

export const updateProfileService = async (data: IUpdateProfile) => {
  const {
    authUserId,
    fullName,
    bio,
    phone,
    profileImage,
    skills,
    experience,
    serviceCategories,
  } = data;

  // fetch profile
  const profile = await User.findOne({ authUserId });
  if (!profile) {
    throw new AppError(404, "user profile not found");
  }

  // update profile

  const updatedProfile = await User.findByIdAndUpdate(
    { _id: profile._id },
    {
      fullName,
      bio,
      phone,
      profileImage,
      skills,
      experience,
      serviceCategories,
    },
    { returnDocument: "after" },
  );

  return updatedProfile;
};

export const updateProfilePicture = async (data: IUpdateProfilePicture) => {
  const { profileImage, authUserId } = data;

  const user = await User.findOne({ authUserId });

  if (!user) {
    throw new AppError(404, "user profile not found");
  }

  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
  ];

  if (!allowedMimeTypes.includes(profileImage.mimetype)) {
    throw new AppError(400, "Only JPG, JPEG, PNG and WEBP images are allowed.");
  }

  const uploadeToCloudinary = await fileUpload(
    profileImage,
    process.env.CLOUD_FOLDER_NAME!,
  );

  const updatedProfilePicture = await User.findOneAndUpdate(
    { authUserId },
    { profileImage: uploadeToCloudinary?.secure_url },
    { returnDocument: "after" },
  );
  return updatedProfilePicture;
};
