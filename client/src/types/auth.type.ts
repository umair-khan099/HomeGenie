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
