import type { Request, Response } from 'express';
import crypto from 'node:crypto';
import { prisma } from '../../lib/prisma.js';
import { ApiError, ok } from '../../lib/http.js';
import { hashPassword, verifyPassword, hashToken, verifyToken } from '../../lib/password.js';
import { sendMail, emailLayout } from '../../lib/email.js';
import {
  issueTokens,
  rotateRefreshToken,
  revokeRefreshToken,
  clearAuthCookies,
  publicUser,
  REFRESH_COOKIE_NAME,
} from './auth.service.js';
import { generatePatientCode } from '../../lib/codes.js';
import type {
  RegisterInput,
  LoginInput,
} from './auth.schemas.js';

function reqMeta(req: Request) {
  return { userAgent: req.headers['user-agent'], ip: req.ip };
}

// POST /auth/register — self-service patient signup (also creates a Patient EMR shell).
export async function register(req: Request, res: Response) {
  const body = req.body as RegisterInput;

  const existing = await prisma.user.findUnique({ where: { email: body.email } });
  if (existing) throw ApiError.conflict('An account with this email already exists.');

  const passwordHash = await hashPassword(body.password);
  const patientCode = await generatePatientCode();

  const user = await prisma.user.create({
    data: {
      email: body.email,
      passwordHash,
      role: 'PATIENT',
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      patient: {
        create: {
          patientCode,
          firstName: body.firstName,
          lastName: body.lastName,
          mobile: body.phone ?? '',
          email: body.email,
          medicalProfile: { create: {} },
        },
      },
    },
  });

  await issueTokens(res, user, reqMeta(req));
  return ok(res, { user: publicUser(user) }, 201);
}

// POST /auth/login
export async function login(req: Request, res: Response) {
  const body = req.body as LoginInput;
  const user = await prisma.user.findUnique({ where: { email: body.email } });
  if (!user || !user.isActive) throw ApiError.unauthorized('Invalid email or password.');

  const valid = await verifyPassword(body.password, user.passwordHash);
  if (!valid) throw ApiError.unauthorized('Invalid email or password.');

  await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
  await issueTokens(res, user, reqMeta(req));
  return ok(res, { user: publicUser(user) });
}

// POST /auth/refresh — rotates the refresh token, returns a new session.
export async function refresh(req: Request, res: Response) {
  const token =
    (req as Request & { cookies?: Record<string, string> }).cookies?.[REFRESH_COOKIE_NAME] ??
    req.body?.refreshToken;
  if (!token) throw ApiError.unauthorized('No refresh token provided');

  const result = await rotateRefreshToken(res, token);
  if (!result) {
    clearAuthCookies(res);
    throw ApiError.unauthorized('Session expired, please sign in again.');
  }
  return ok(res, { user: publicUser(result.user) });
}

// POST /auth/logout
export async function logout(req: Request, res: Response) {
  const token = (req as Request & { cookies?: Record<string, string> }).cookies?.[
    REFRESH_COOKIE_NAME
  ];
  await revokeRefreshToken(token);
  clearAuthCookies(res);
  return ok(res, { message: 'Signed out' });
}

// GET /auth/me
export async function me(req: Request, res: Response) {
  if (!req.user) throw ApiError.unauthorized();
  const user = await prisma.user.findUnique({ where: { id: req.user.sub } });
  if (!user) throw ApiError.unauthorized();
  return ok(res, { user: publicUser(user) });
}

// POST /auth/forgot-password — generates a 6-digit OTP and emails it.
export async function forgotPassword(req: Request, res: Response) {
  const email = req.body.email as string;
  const user = await prisma.user.findUnique({ where: { email } });

  // Always respond success (don't leak which emails exist).
  if (user) {
    const otp = String(crypto.randomInt(100000, 999999));
    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        otpHash: await hashToken(otp),
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    });
    await sendMail({
      to: email,
      subject: 'Your password reset code',
      html: emailLayout(
        'Password reset code',
        `<p style="color:#334155;line-height:1.6;">Use the code below to reset your password. It expires in 15 minutes.</p>
         <div style="font-size:32px;font-weight:800;letter-spacing:8px;color:#1f6feb;margin:16px 0;">${otp}</div>
         <p style="color:#94a3b8;font-size:13px;">If you didn't request this, you can safely ignore this email.</p>`,
      ),
    });
  }
  return ok(res, { message: 'If that email exists, a reset code has been sent.' });
}

// POST /auth/reset-password — verifies OTP and sets a new password.
export async function resetPassword(req: Request, res: Response) {
  const { email, otp, password } = req.body as {
    email: string;
    otp: string;
    password: string;
  };
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw ApiError.badRequest('Invalid or expired reset code.');

  const reset = await prisma.passwordReset.findFirst({
    where: { userId: user.id, usedAt: null, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: 'desc' },
  });
  if (!reset || !(await verifyToken(otp, reset.otpHash))) {
    throw ApiError.badRequest('Invalid or expired reset code.');
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: await hashPassword(password) },
    }),
    prisma.passwordReset.update({ where: { id: reset.id }, data: { usedAt: new Date() } }),
    // Revoke all sessions on password change.
    prisma.refreshToken.updateMany({
      where: { userId: user.id, revokedAt: null },
      data: { revokedAt: new Date() },
    }),
  ]);

  return ok(res, { message: 'Password updated. Please sign in.' });
}
