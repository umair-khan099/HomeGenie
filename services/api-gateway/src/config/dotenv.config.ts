import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["PORT", "ACCESS_TOKEN_SECRET"];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    console.log(`${key} is missing in .env`);
  }
});

export const CONFIG = {
  PORT: process.env.PORT!,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
};
