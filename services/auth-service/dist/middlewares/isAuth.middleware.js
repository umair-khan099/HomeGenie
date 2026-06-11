import { AppError } from "../utils/appError.js";
import jwt from "jsonwebtoken";
import CONFIG from "../config/config.js";
export const isAuth = (req, res, next) => {
    var _a;
    try {
        // token can come from Authorization header OR from cookie `token`
        const authHeader = req.headers.authorization;
        const tokenFromHeader = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer "))
            ? authHeader.split(" ")[1]
            : undefined;
        const tokenFromCookie = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        const token = tokenFromHeader || tokenFromCookie;
        if (!token) {
            throw new AppError(401, "Unauthorized");
        }
        const decoded = jwt.verify(token, CONFIG.JWT_SECRET);
        if (!decoded || typeof decoded !== "object" || !decoded._id) {
            throw new AppError(401, "Unauthorized");
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        next(new AppError(401, "Invalid or Expired Token"));
    }
};
