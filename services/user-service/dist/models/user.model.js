"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    //auth id
    authUserId: {
        type: String,
        required: true,
    },
    //name
    fullName: {
        type: String,
        trim: true,
        required: true,
    },
    //email
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    //phone number
    phone: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        minLength: 10,
        maxLength: 10,
    },
    //profile image url
    profileImage: {
        type: String,
        required: true,
    },
    //bio
    bio: {
        type: String,
    },
    //role
    role: {
        type: String,
        enum: ["Customer", "Service Provider", "Admin"],
        default: "Customer",
    },
    // skils
    skill: [
        {
            type: String,
            trim: true,
        },
    ],
    // works experience
    experience: {
        type: Number,
        default: 0,
    },
    // service categary
    serviceCategory: [
        {
            type: String,
            trim: true,
        },
    ],
    // is worker avalable
    isAvailable: {
        type: Boolean,
    },
    //avrage rating
    avarageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    // total review of worker
    totalReview: {
        type: Number,
        default: 0,
    },
    // job complited by worker
    totalJobComplited: {
        type: Number,
        default: 0,
    },
    // adress of user or  worker
    adress: {
        type: String,
        required: true,
    },
    // is worker verifed
    isVerifedWorker: {
        type: Boolean,
        default: false,
    },
    //  blocked  worker
    isBlocked: {
        type: Boolean,
        default: false,
    },
    // last active
    lastActiveAt: {
        type: String,
        default: "",
    },
});
exports.User = mongoose_1.default.model("userProfile", userSchema);
