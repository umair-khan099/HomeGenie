import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createProfileService } from "../services/profileService.js";
import { AppResponse } from "../utils/appResponse.js";

export const createProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    const { fullName, role, phone, authUserId, email, profileImage } = req.body;

    // condiition not here with zod validation

    const response = await createProfileService({
      fullName,
      role,
      phone,
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
