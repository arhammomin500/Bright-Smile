import type { NextFunction, Request, Response } from 'express';
import { verifyAccessToken, type AccessTokenPayload } from '../lib/jwt.js';
import { ApiError } from '../lib/http.js';
import type { Role } from '../constants/enums.js';

// Augment Express Request with the authenticated user.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AccessTokenPayload;
    }
  }
}

function extractToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (header?.startsWith('Bearer ')) return header.slice(7);
  // Fallback to cookie (used by the browser client).
  const cookieToken = (req as Request & { cookies?: Record<string, string> }).cookies?.accessToken;
  return cookieToken ?? null;
}

// Requires a valid access token.
export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const token = extractToken(req);
  if (!token) throw ApiError.unauthorized('Authentication required');
  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    throw ApiError.unauthorized('Invalid or expired session');
  }
}

// Attaches the user if a token is present, but never rejects.
export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const token = extractToken(req);
  if (token) {
    try {
      req.user = verifyAccessToken(token);
    } catch {
      /* ignore — treat as anonymous */
    }
  }
  next();
}

// Restricts a route to one of the given roles.
export function authorize(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) throw ApiError.unauthorized('Authentication required');
    if (roles.length && !roles.includes(req.user.role)) {
      throw ApiError.forbidden('You do not have access to this resource');
    }
    next();
  };
}

// Convenience: staff = anyone who runs the clinic.
export const STAFF_ROLES: Role[] = ['RECEPTION', 'DOCTOR', 'ADMIN'];
