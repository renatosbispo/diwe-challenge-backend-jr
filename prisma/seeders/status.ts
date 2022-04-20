import { PrismaClient } from '@prisma/client';
import Seeder from './seeder';

export default class StatusSeeder implements Seeder {
  protected prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async seed() {
    console.log('Seeding statuses...');

    await Promise.all([
      this.prisma.status.upsert({
        where: { id: 1 },
        update: {},
        create: {
          name: 'paid'
        }
      }),
      this.prisma.status.upsert({
        where: { id: 2 },
        update: {},
        create: {
          name: 'unpaid'
        }
      })
    ]);
  }
}