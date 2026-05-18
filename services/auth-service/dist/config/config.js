import dotenv from "dotenv";
dotenv.config();
if (!process.env.PORT) {
    throw new Error("PORT is missing in .env");
}
if (!process.env.MONGO_URI) {
    throw new Error("MONGO URI is missing in .env");
}
const CONFIG = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
};
export default CONFIG;
