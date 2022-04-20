import { PrismaClient } from '@prisma/client';
import StatusSeeder from './seeders/status';
import TypeSeeder from './seeders/type';

const prisma = new PrismaClient();

async function main() {
  await new StatusSeeder(prisma).seed();
  await new TypeSeeder(prisma).seed();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
