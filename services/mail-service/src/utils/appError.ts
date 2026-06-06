export class AppError extends Error {
  statusCode: number;
  success: boolean;
  errors: unknown[];

  constructor(
    message: string,
    statusCode: number,
    errors: unknown[] = [],
    stack?: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
