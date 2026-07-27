import type { NextFunction, Request, Response } from 'express';

// Standard application error with an HTTP status code.
export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
    this.name = 'ApiError';
  }

  static badRequest(message = 'Bad request', details?: unknown) {
    return new ApiError(400, message, details);
  }
  static unauthorized(message = 'Unauthorized') {
    return new ApiError(401, message);
  }
  static forbidden(message = 'Forbidden') {
    return new ApiError(403, message);
  }
  static notFound(message = 'Not found') {
    return new ApiError(404, message);
  }
  static conflict(message = 'Conflict', details?: unknown) {
    return new ApiError(409, message, details);
  }
}

// Wraps an async route handler so thrown/rejected errors reach the error middleware.
export function asyncHandler<
  T extends (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
>(fn: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Consistent success envelope.
export function ok(res: Response, data: unknown, status = 200) {
  return res.status(status).json({ success: true, data });
}

export function paginated(
  res: Response,
  items: unknown[],
  meta: { page: number; pageSize: number; total: number },
) {
  return res.json({
    success: true,
    data: items,
    meta: {
      ...meta,
      totalPages: Math.max(1, Math.ceil(meta.total / meta.pageSize)),
    },
  });
}
