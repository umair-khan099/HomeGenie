import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = ["PORT", "MONGO_URI", "JWT_SECRET"];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    console.log(`${key} is missing in .env`);
  }
});

// ["PORT" , "MONGO_URI" , "JWT_SECRET"].forEach((key) => if(!process.env.key) console.log(`${key} is missing in .env`))

const CONFIG = {
  PORT: process.env.PORT!,
  MONGO_URI: process.env.MONGO_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
};

export default CONFIG;
