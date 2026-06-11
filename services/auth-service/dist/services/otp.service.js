var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import { Otp } from "../models/otp.model.js";
import { User } from "../models/user.model.js";
import { AppError } from "../utils/appError.js";
import otp from "otp-generator";
import { mailTemplate } from "../template/mail.template.js";
export const sendEmailService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email } = userData;
    const isExist = yield User.findOne({ email });
    if (isExist) {
        throw new AppError(409, "User already Exist , Please login");
    }
    const newOtp = otp.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });
    const otpDoc = yield Otp.create({ email, otp: newOtp });
    const mailData = {
        email: email,
        subject: "For otp verification",
        body: mailTemplate(newOtp),
        from: "HomeGenie",
    };
    try {
        const response = yield axios.post("http://localhost:8000/api/v1/send-mail", mailData);
    }
    catch (err) {
        console.log(err.code);
        console.log(err.message);
        console.log((_a = err.response) === null || _a === void 0 ? void 0 : _a.data);
    }
    return otpDoc;
});
