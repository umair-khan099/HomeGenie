var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import CONFIG from "./config.js";
const dbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!CONFIG.MONGO_URI) {
            console.log("Mongo uri  not ound");
            process.exit(1);
        }
        yield mongoose.connect(CONFIG.MONGO_URI);
        console.log("Auth service db connected successfully");
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Auth service Db Connection failed", error.message);
            process.exit(1);
        }
        else {
            console.log("Auth service Db connection failed with some other Error", error);
            process.exit(1);
        }
    }
});
export default dbConnect;
