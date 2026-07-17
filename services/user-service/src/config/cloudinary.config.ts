import { v2 } from "cloudinary";
import CONFIG from "./dotenv.congif.js";

console.log({
  cloud_name: CONFIG.CLOUD_NAME,
  api_key: CONFIG.CLOUDINARY_API_KEY,
  api_secret: CONFIG.CLOUDINARY_API_SECRET,
});

v2.config({
  cloud_name: CONFIG.CLOUD_NAME,
  api_key: CONFIG.CLOUDINARY_API_KEY,
  api_secret: CONFIG.CLOUDINARY_API_SECRET,
});

export default v2;
