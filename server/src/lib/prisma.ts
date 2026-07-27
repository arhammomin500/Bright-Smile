import { PrismaClient } from '@prisma/client';
import { env } from '../config/env.js';

// A single shared Prisma client. `globalThis` caching prevents connection
// exhaustion from tsx watch reloads during development.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.isProd ? ['error'] : ['warn', 'error'],
  });

if (!env.isProd) globalForPrisma.prisma = prisma;
