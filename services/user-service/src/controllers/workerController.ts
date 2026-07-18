import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { becomeWorkerService } from "../services/workerService.js";
import { UploadedFile } from "express-fileupload";

export const becomeWorkerController = asyncHandler(
  async (req: Request, res: Response) => {

    const profileImage = req.files?.profileImage as UploadedFile;
    const userDetails = JSON.parse(req.headers["user_id"] as string);
    const authUserId = userDetails.userId;

    const {
      phone,
      bio,
      skills,
      experience,
      serviceCategories,
      address,
      panNumber,
      adharNumber,
      citizanShip,
      nativeLanguge,
    } = req.body;
  },

  const response = await becomeWorkerService({})
  
);
