import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import type { Role } from '../constants/enums.js';

export interface AccessTokenPayload {
  sub: number; // user id
  role: Role;
  email: string;
  patientId?: number | null;
  doctorId?: number | null;
}

export interface RefreshTokenPayload {
  sub: number;
  tokenId: number; // RefreshToken row id
}

export function signAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, env.jwt.accessSecret, {
    expiresIn: env.jwt.accessExpires as jwt.SignOptions['expiresIn'],
  });
}

export function signRefreshToken(payload: RefreshTokenPayload): string {
  return jwt.sign(payload, env.jwt.refreshSecret, {
    expiresIn: env.jwt.refreshExpires as jwt.SignOptions['expiresIn'],
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, env.jwt.accessSecret) as unknown as AccessTokenPayload;
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return jwt.verify(token, env.jwt.refreshSecret) as unknown as RefreshTokenPayload;
}
