import { User } from "../models/user.model.js";
import { AppError } from "../utils/appError.js";

interface ICreateProfile {
  fullName: string;
  role: "Customer" | "Service Provider";
  authUserId: string;
  email: string;
  profileImage: string;
}
interface IUpdateProfile {
  authUserId: string;
  fullName: string;
  bio: string;
  profileImage: string;
  phone: string;
  skills: string[];
  experience: number;
  serviceCategories: string[];
}

export const createProfileService = async (data: ICreateProfile) => {
  const { fullName, role, authUserId, email, profileImage } = data;

  // cheak if the user exist already

  const isProfileExist = await User.findOne({ authUserId });
  if (isProfileExist) {
    throw new AppError(400, "Profile Already created");
  }
  // create profile

  const profile = await User.create({
    fullName,
    role,
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
