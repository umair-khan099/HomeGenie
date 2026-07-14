import v2 from "../config//cloudinary.config.js";
import { UploadApiOptions } from "cloudinary";

interface OptionsI {
  resource_type: string;
  folder: string;
  height?: any;
  width?: any;
}

export const fileUpload = async (
  file: any,
  folder: string,
  height: any = undefined,
  width: any = undefined,
) => {
  try {
    const options: UploadApiOptions = {
      resource_type: "auto",
      folder: folder,
    };
    if (height) {
      options.height = height;
    }
    if (width) {
      options.width = width;
    }
    if (!file.tempFilePath) {
      throw new Error("File path not found");
    }

    return await v2.uploader.upload(file.tempFilePath, options);
  } catch (error) {
    console.log("Cloudinary file uploade error", error);
  }
};
