import { NextFunction, Request, Response } from "express";

export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = Error.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} url:: ${req.url}`);
  next();
};

export const errorLogger = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("\x1b[33m%s\x1b[0m", error);
  next(error);
};

export const errorResponder = (error: AppError, req: Request, res: Response, next: NextFunction) => {
  res.header("Content-Type", "application/json");
  const status = error.statusCode || 400;
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    statusCode,
    message: error.message,
  });
};

export const invalidPathHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ statusCode: 404, message: "invalid path" });
};
