export type signUpPayload = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  otp?: string;
};

export type loginPayload = {
  email: string;
  password: string;
};

export type forgetPasswordPayload = {
  token: string;
  password: string;
  confirmPassword: string;
};
