import { createApp } from './app.js';
import { env } from './config/env.js';
import { prisma } from './lib/prisma.js';

async function main() {
  const app = createApp();

  // Fail fast if the database is unreachable.
  try {
    await prisma.$connect();
    // eslint-disable-next-line no-console
    console.log('✓ Connected to database');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('✗ Database connection failed. Is SQL Server running and DATABASE_URL correct?');
    console.error(err instanceof Error ? err.message : err);
  }

  const server = app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`\n  🦷  ${env.clinic.name} API`);
    console.log(`  ➜  http://localhost:${env.port}/api/health`);
    console.log(`  ➜  env: ${env.nodeEnv}\n`);
  });

  const shutdown = async () => {
    // eslint-disable-next-line no-console
    console.log('\nShutting down…');
    server.close();
    await prisma.$disconnect();
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

main();
