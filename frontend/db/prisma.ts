import 'dotenv/config';
import chalk from 'chalk';
import { singleton } from '@/utils/singleton';
import { Prisma, PrismaClient } from '@prisma/client';

const logThreshold = 0;

const prisma = singleton('prisma', () => {
  const client = new PrismaClient({
    log: [
      { level: 'error', emit: 'event' },
      { level: 'warn', emit: 'event' },
      { level: 'query', emit: 'event' },
    ],
    datasources: {
      db: {
        url: process.env.POSTGRES_URL,
      },
    },
  });
  client.$on('query', async (e: Prisma.QueryEvent) => {
    if (e.duration < logThreshold) return;
    const color =
      e.duration < logThreshold * 1.1
        ? 'green'
        : e.duration < logThreshold * 1.2
        ? 'blue'
        : e.duration < logThreshold * 1.3
        ? 'yellow'
        : e.duration < logThreshold * 1.4
        ? 'redBright'
        : 'red';
    const dur = chalk[color](`${e.duration}ms`);
    console.info(`prisma:query - ${dur} - ${e.query}`);
  });
  client.$connect();
  return client;
});

export { prisma };
