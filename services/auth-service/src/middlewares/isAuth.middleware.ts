import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import CONFIG from "../config/config.js";

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
      throw new AppError(401, "Unauthorized");
    }

    const decoded = jwt.verify(token, CONFIG.JWT_SECRET) as AuthUser;

    if (!decoded || typeof decoded !== "object" || !decoded._id) {
      throw new AppError(401, "Unauthorized");
    }

    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError(401, "Invalid or Expired Token"));
  }
};
