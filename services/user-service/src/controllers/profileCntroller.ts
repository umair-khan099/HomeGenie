import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createProfileService,
  getProfileService,
  updateProfilePicture,
  updateProfileService,
} from "../services/profileService.js";
import { AppResponse } from "../utils/appResponse.js";
import { AppError } from "../utils/appError.js";
import { UploadedFile } from "express-fileupload";



export const createProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    const { fullName, authUserId, email, profileImage } = req.body;

    // condiition not here with zod validation

    const response = await createProfileService({
      fullName,
      authUserId,
      email,
      profileImage,
    });

    return res
      .status(200)
      .json(
        new AppResponse(200, response, "user profile created successfully"),
      );
  },
);

export const getprofileController = asyncHandler(
  async (req: Request, res: Response) => {
    const userDetails = JSON.parse(req.headers["user_id"] as string);
    const userId = userDetails.userId;

    if (!userId) {
      throw new AppError(401, "Unauthorized");
    }

    const response = await getProfileService(userId);
    return res
      .status(200)
      .json(
        new AppResponse(200, response, "user profile created successfully"),
      );
  },
);

export const updateProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    const userDetails = JSON.parse(req.headers["user_id"] as string);
    const authUserId = userDetails.userId;

    if (!authUserId) {
      throw new AppError(401, "Unauthorized");
    }

    const {
      fullName,
      phone,
      profileImage,
      bio,
      skills = [],
      experience = 0,
      serviceCategories = [],
    } = req.body;

    const response = await updateProfileService({
      authUserId,
      fullName,
      bio,
      phone,
      profileImage,
      skills,
      experience,
      serviceCategories,
    });

    return res
      .status(200)
      .json(
        new AppResponse(200, response, "user profile updated successfully"),
      );
  },
);

export const updateProfilePictureController = asyncHandler(
  async (req: Request, res: Response) => {
    const profileImage = req.files?.profileImage as UploadedFile;
    const userDetails = JSON.parse(req.headers["user_id"] as string);
    const authUserId = userDetails.userId;

    if (!authUserId) {
      throw new AppError(401, "Unauthorized");
    }
    if (!profileImage) {
      throw new AppError(400, "please select the profile picture");
    }

    const response = await updateProfilePicture({ authUserId, profileImage });

    return res
      .status(201)
      .json(new AppResponse(200, response, "profile imge update successcully"));
  },
);
