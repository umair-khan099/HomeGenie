import { Request, Response, NextFunction, RequestHandler } from "express";

export const asyncHandler =
  (requestHandler: RequestHandler): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
