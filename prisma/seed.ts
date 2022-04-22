import prisma from '.';
import FinancialEntrySeeder from './seeders/financial-entry';
import StatusSeeder from './seeders/status';
import TypeSeeder from './seeders/type';
import UserSeeder from './seeders/user';


async function main() {
  await new StatusSeeder(prisma).seed();
  await new TypeSeeder(prisma).seed();
  await new UserSeeder(prisma).seed();
  await new FinancialEntrySeeder(prisma).seed();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
