import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = [
  "PORT",
  "MONGO_URI",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "CLOUD_NAME",
  "CLOUD_FOLDER_NAME",
 
];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    console.log(`${key} is missing in .env`);
  }
});

// ["PORT" , "MONGO_URI" , "JWT_SECRET"].forEach((key) => if(!process.env.key) console.log(`${key} is missing in .env`))

const CONFIG = {
  PORT: process.env.PORT!,
  MONGO_URI: process.env.MONGO_URI!,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
  CLOUD_NAME: process.env.CLOUD_NAME!,
  CLOUD_FOLDER_NAME: process.env.CLOUD_FOLDER_NAME!,
};

export default CONFIG;
