import dotenv from "dotenv";
dotenv.config();

if (!process.env.PORT) {
  throw new Error("PORT is missing in .env");
}
const CONFIG = {
  PORT: process.env.PORT,
};

export default CONFIG;
