import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { env } from './config/env.js';
import api from './routes.js';
import { notFound, errorHandler } from './middleware/error.js';
import { UPLOAD_ROOT } from './middleware/upload.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// In production the server also serves the built React app (single service,
// same origin → auth cookies need no cross-site configuration).
const CLIENT_DIST = path.resolve(__dirname, '../../client/dist');

export function createApp() {
  const app = express();

  app.set('trust proxy', 1);

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' }, // allow client to load /uploads
      contentSecurityPolicy: false, // the SPA loads inline styles (MUI/emotion)
    }),
  );
  app.use(
    cors({
      origin: env.clientUrl,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  if (!env.isProd) app.use(morgan('dev'));

  // Global, generous rate limit (per-route limiters are stricter).
  app.use(
    '/api',
    rateLimit({ windowMs: 60 * 1000, max: 300, standardHeaders: true, legacyHeaders: false }),
  );

  // Serve uploaded files (X-rays, reports, etc.).
  app.use('/uploads', express.static(UPLOAD_ROOT));

  app.use('/api', api);

  // ── Production: serve the built client + SPA fallback ────────────────
  if (env.isProd && fs.existsSync(CLIENT_DIST)) {
    // Vite emits content-hashed asset filenames → cache those hard;
    // index.html must always revalidate so deploys show up immediately.
    app.use(express.static(CLIENT_DIST, { maxAge: '30d', immutable: true, index: false }));
    app.get('*', (req, res, next) => {
      // API/uploads 404s should fall through to the JSON handler.
      if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) return next();
      return res.sendFile(path.join(CLIENT_DIST, 'index.html'), {
        headers: { 'Cache-Control': 'no-cache' },
      });
    });
  }

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
