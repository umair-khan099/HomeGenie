import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        required: [true, "fullName feild is missiing"],
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "Email feild is  missing"],
    },
    password: {
        type: String,
        required: [true, "password feild is missing  "],
    },
    role: {
        type: String,
        enum: ["User", "Worker", "Admin"],
        default: "User",
    },
}, { timestamps: true });
export const User = mongoose.model("user", userSchema);
