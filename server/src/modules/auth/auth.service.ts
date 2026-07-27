import type { Response } from 'express';
import type { User } from '@prisma/client';
import { prisma } from '../../lib/prisma.js';
import { hashToken, verifyToken } from '../../lib/password.js';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../../lib/jwt.js';
import { env } from '../../config/env.js';
import type { Role } from '../../constants/enums.js';

const ACCESS_COOKIE = 'accessToken';
const REFRESH_COOKIE = 'refreshToken';

const cookieBase = {
  httpOnly: true,
  secure: env.isProd,
  sameSite: 'lax' as const,
  path: '/',
};

// Issues a fresh access+refresh pair, persists the refresh token hash, and sets
// httpOnly cookies. Returns the access token for clients that prefer headers.
export async function issueTokens(
  res: Response,
  user: Pick<User, 'id' | 'email' | 'role' | 'patientId' | 'doctorId'>,
  meta?: { userAgent?: string; ip?: string },
) {
  const record = await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash: '', // filled after we know the row id
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      userAgent: meta?.userAgent?.slice(0, 500),
      ip: meta?.ip,
    },
  });

  const refreshToken = signRefreshToken({ sub: user.id, tokenId: record.id });
  await prisma.refreshToken.update({
    where: { id: record.id },
    data: { tokenHash: await hashToken(refreshToken) },
  });

  const accessToken = signAccessToken({
    sub: user.id,
    email: user.email,
    role: user.role as Role,
    patientId: user.patientId,
    doctorId: user.doctorId,
  });

  res.cookie(ACCESS_COOKIE, accessToken, { ...cookieBase, maxAge: 15 * 60 * 1000 });
  res.cookie(REFRESH_COOKIE, refreshToken, {
    ...cookieBase,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return { accessToken, refreshToken };
}

// Validates a refresh token, rotates it (revokes old, issues new), returns tokens.
export async function rotateRefreshToken(res: Response, token: string) {
  let payload;
  try {
    payload = verifyRefreshToken(token);
  } catch {
    return null;
  }

  const record = await prisma.refreshToken.findUnique({
    where: { id: payload.tokenId },
    include: { user: true },
  });
  if (!record || record.revokedAt || record.expiresAt < new Date()) return null;

  const matches = await verifyToken(token, record.tokenHash);
  if (!matches) return null;

  // Revoke the used token (rotation).
  await prisma.refreshToken.update({
    where: { id: record.id },
    data: { revokedAt: new Date() },
  });

  const tokens = await issueTokens(res, record.user);
  return { tokens, user: record.user };
}

export async function revokeRefreshToken(token: string | undefined) {
  if (!token) return;
  try {
    const payload = verifyRefreshToken(token);
    await prisma.refreshToken.updateMany({
      where: { id: payload.tokenId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  } catch {
    /* already invalid */
  }
}

export function clearAuthCookies(res: Response) {
  res.clearCookie(ACCESS_COOKIE, cookieBase);
  res.clearCookie(REFRESH_COOKIE, cookieBase);
}

export const REFRESH_COOKIE_NAME = REFRESH_COOKIE;

// Shape returned to the client for the authenticated user.
export function publicUser(user: User) {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    avatarUrl: user.avatarUrl,
    patientId: user.patientId,
    doctorId: user.doctorId,
  };
}
