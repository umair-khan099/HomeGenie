import mongoose from "mongoose";
import CONFIG from "./config.js";
const dbConnect = async (): Promise<void> => {
  try {
    if (!CONFIG.MONGO_URI) {
      console.log("Mongo uri  not ound");
      process.exit(1);
    }
    await mongoose.connect(CONFIG.MONGO_URI);
    console.log("Auth service db connected successfully");
  } catch (error) {
    if (error instanceof Error) {
      console.log("Auth service Db Connection failed", error.message);
      process.exit(1);
    } else {
      console.log(
        "Auth service Db connection failed with some other Error",
        error,
      );
      process.exit(1);
    }
  }
};

export default dbConnect;
