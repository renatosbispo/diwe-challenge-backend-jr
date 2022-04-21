import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import { join } from 'path';
import { URL } from 'url';
import { v4 as uuidv4 } from 'uuid';

// File content adapted from: https://blog.ludicroushq.com/a-better-way-to-run-integration-tests-with-prisma-and-postgresql

// Comments are my own

// Generate a new database URL with a unique test identifier
const generateDatabaseURL = (uniqueDatabaseName: string) => {
  if (!process.env.DATABASE_URL) {
    throw new Error('No database URL found.');
  }

  const url = new URL(process.env.DATABASE_URL);
  const urlPathname = url.pathname;

  return url.toString().replace(urlPathname, `/${uniqueDatabaseName}`);
};

// Generate a unique identifier for the test
const uniqueDatabaseName = `test-${uuidv4()}`;

// Retrieve prisma binary
const prismaBinary = join(
  __dirname,
  '..',
  '..',
  'node_modules',
  '.bin',
  'prisma'
);

const url = generateDatabaseURL(uniqueDatabaseName);

// Set DATABASE_URL, used by Prisma to connect with DB, to the generated URL
process.env.DATABASE_URL = url;

// Instantiate prisma client with generated URL as data source
const prisma = new PrismaClient({
  datasources: { db: { url } },
});

// Setup test hook to create DB structure based on the prisma schema
beforeEach(() => {
  execSync(`${prismaBinary} db push`, {
    env: {
      ...process.env,
    },
  });
});

// Setup test hook to destroy test DB structure
afterEach(async () => {
  await prisma.$executeRaw`DROP DATABASE IF EXISTS ${uniqueDatabaseName};`

  await prisma.$disconnect();
});

export default prisma;
