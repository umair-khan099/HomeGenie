import jwt, { Secret, SignOptions } from "jsonwebtoken";

export const generateToken = (
  payload: object,
  JWT_SECRET: string,
  expiresIn: SignOptions["expiresIn"],
): string => {
  return jwt.sign(payload, JWT_SECRET as Secret, { expiresIn });
};
export const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 10 * 24 * 60 * 60 * 1000,
};
