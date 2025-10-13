import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error("Error:", err.message);

  const status = err.status || 500;
  const detail = err.detail || null;

  res.status(status).json({
    error: err.message,
    detail,
  });
}