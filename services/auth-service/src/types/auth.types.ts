export interface ISignUpData {
  fullName: string;
  email: string;
  password: string;
  role: "User" | "Worker" | "Admin";
  otp: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IForgetPassword {
  email: string;
  newOtp: string;
}
