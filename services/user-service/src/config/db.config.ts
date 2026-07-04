import mongoose from "mongoose";
const dbConnect = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      console.log("Mongo uri  not ound");
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("User service db connected successfully");
  } catch (error) {
    if (error instanceof Error) {
      console.log("User service Db Connection failed", error.message);
      process.exit(1);
    } else {
      console.log(
        "User service Db connection failed with some other Error",
        error,
      );
      process.exit(1);
    }
  }
};

export default dbConnect;
