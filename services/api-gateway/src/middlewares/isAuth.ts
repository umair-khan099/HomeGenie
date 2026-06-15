import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CONFIG } from "../config/dotenv.config.js";
import { AppError } from "../utils/AppError.js";

type AuthUser = JwtPayload & { _id: string };

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    // token can come from Authorization header OR from cookie `token`
    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : undefined;

    const tokenFromCookie = (req as any).cookies?.accessToken;
    const tokenFromBody = req.body?.token;
    const token = tokenFromHeader || tokenFromCookie || tokenFromBody;

    if (!token) {
      throw new AppError(401, "Unauthorized token not found");
    }

    const decoded = jwt.verify(token, CONFIG.ACCESS_TOKEN_SECRET) as AuthUser;

    if (!decoded || typeof decoded !== "object" || !decoded.userId) {
      throw new AppError(401, "Unauthorized not verifyed otp");
    }

    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError(401, "Invalid or Expired Token"));
  }
};
