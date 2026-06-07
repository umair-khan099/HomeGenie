import axios from "axios";
import { Otp } from "../models/otp.model.js";
import { User } from "../models/user.model.js";
import { AppError } from "../utils/appError.js";
import otp from "otp-generator";
import { mailTemplate } from "../template/mail.template.js";

interface IUserData {
  fullName: string;
  email: string;
  password: string;
  role: "User" | "Worker" | "Admin";
}

export const sendEmailService = async (userData: IUserData) => {
  const { email } = userData;

  const isExist = await User.findOne({ email });

  if (isExist) {
    throw new AppError(409, "User already Exist , Please login");
  }

  const newOtp = otp.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  const otpDoc = await Otp.create({ email, otp: newOtp });

  const mailData = {
    email: email,
    subject: "For otp verification",
    body: mailTemplate(newOtp),
    from: "HomeGenie",
  };
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/send-mail",
      mailData,
    );
  } catch (err: any) {
    console.log(err.code);

    console.log(err.message);

    console.log(err.response?.data);
  }
  return otpDoc;
};

