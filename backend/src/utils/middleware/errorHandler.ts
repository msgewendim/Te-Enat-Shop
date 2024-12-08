import { Request, Response, NextFunction } from "express";
import {
  ServiceError,
  ValidationError,
  BadRequestError,
  ExternalServiceError,
  NotFoundError,
} from "../customErrors";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); // Log the error for debugging
  if (err instanceof ServiceError) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: err.message || "An unexpected error occurred.",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }

  if (err instanceof BadRequestError) {
    const statusCode = 400;
    return res.status(statusCode).json({
      success: false,
      message: err.message || "Bad request error.",
    });
  }

  if (err instanceof NotFoundError) {
    const statusCode = 404;
    return res.status(statusCode).json({
      success: false,
      message: err.message || "Not found error.",
    });
  }

  if (err instanceof ExternalServiceError) {
    const statusCode = 503;
    return res.status(statusCode).json({
      success: false,
      message: err.message || "External service error.",
    });
  }

  // handle validation errors
  if (err instanceof ValidationError) {
    const statusCode = 500;
    return res.status(statusCode).json({
      success: false,
      message: err.message || "Validation error.",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }

  // handle other errors
  if (err instanceof Error) {
    const statusCode = 500;

    res.status(statusCode).json({
      success: false,
      message: err.message || "An unexpected error occurred.",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }
};

export default errorHandler;
