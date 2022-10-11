export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: any) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = Error.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}
