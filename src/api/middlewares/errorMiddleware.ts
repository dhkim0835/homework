import { NextFunction, Request, Response } from "express";
import { AppError } from "../../exception/appError";

// userid를 전달하기 위해 Request user 프로퍼티 추가
declare global {
  namespace Express {
    interface Request {
      responseObject?: any;
      statusCode?: number;
    }
  }
}

export const errorMiddleware = (error: AppError, req: Request, res: Response, next: NextFunction) => {
  res.header("Content-Type", "application/json");
  console.log("\x1b[33m%s\x1b[0m", error);
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    statusCode,
    message: error.message,
  });
};
