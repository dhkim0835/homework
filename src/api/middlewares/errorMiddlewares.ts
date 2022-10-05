import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("\x1b[33m%s\x1b[0m", error);
  const status = res.statusCode || 500;
  const message = error.message || "Something went wrong";
  console.log("message", message);
  res.status(status).json({
    status,
    message,
  });
};

export { errorMiddleware };