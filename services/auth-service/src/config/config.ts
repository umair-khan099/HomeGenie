import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = [
  "PORT",
  "MONGO_URI",
  "REDIS_PORT",
  "REDIS_PASS",
  "REDIS_HOST",
  "ACCESS_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET",
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
  JWT_SECRET: process.env.JWT_SECRET!,
  REDIS_PASS: process.env.REDIS_PASS!,
  REDIS_HOST: process.env.REDIS_HOST!,
  REDIS_PORT: process.env.REDIS_PORT!,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!,
};

export default CONFIG;
