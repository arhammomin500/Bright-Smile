import type { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { ApiError } from '../lib/http.js';
import { env } from '../config/env.js';

export function notFound(_req: Request, _res: Response, next: NextFunction) {
  next(ApiError.notFound('Route not found'));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  // Known application errors
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      success: false,
      error: { message: err.message, details: err.details },
    });
  }

  // Prisma constraint / not-found errors → friendly messages
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const target = (err.meta?.target as string[] | undefined)?.join(', ') ?? 'field';
      return res.status(409).json({
        success: false,
        error: { message: `A record with this ${target} already exists.` },
      });
    }
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, error: { message: 'Record not found.' } });
    }
  }

  // Fallback
  // eslint-disable-next-line no-console
  console.error('[unhandled error]', err);
  return res.status(500).json({
    success: false,
    error: {
      message: 'Something went wrong on our end.',
      ...(env.isProd ? {} : { debug: err instanceof Error ? err.message : String(err) }),
    },
  });
}
