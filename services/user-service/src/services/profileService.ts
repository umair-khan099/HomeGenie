import { User } from "../models/user.model.js";
import { AppError } from "../utils/appError.js";

interface ICreateProfile {
  fullName: string;
  role: "Customer" | "Service Provider";
  phone: string;
  authUserId: string;
  email: string;
  profileImage: string;
}

export const createProfileService = async (data: ICreateProfile) => {
  const { fullName, role, phone, authUserId, email, profileImage } = data;

  // cheak if the user exist already

  const isProfileExist = await User.findOne({ authUserId });
  if (isProfileExist) {
    throw new AppError(400, "Profile Already created");
  }
  // create profile

  const profile = await User.create({
    fullName,
    role,
    phone,
    authUserId,
    email,
    profileImage,
  });

  return profile;
};


 