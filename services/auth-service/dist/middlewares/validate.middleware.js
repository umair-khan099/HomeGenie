import { AppError } from "../utils/appError.js";
export const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const formattedErrors = result.error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
        }));
        return next(new AppError(400, "Validation Failed", formattedErrors));
    }
    req.body = result.data;
    next();
};
