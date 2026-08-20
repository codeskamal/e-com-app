import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const statusCode = (err as { statusCode?: number }).statusCode ?? 500;
  const code = (err as { code?: string }).code ?? "INTERNAL_ERROR";
  const details = (err as { details?: Record<string, string[]> }).details;

  const message =
    statusCode === 500 ? "Internal server error" : err.message;

  if (statusCode === 500) {
    console.error("Unhandled error:", { message: err.message, stack: err.stack });
  }

  res.status(statusCode).json({
    error: {
      code,
      message,
      ...(details && { details }),
    },
  });
}
