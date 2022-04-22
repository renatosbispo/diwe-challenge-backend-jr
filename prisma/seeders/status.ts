import { PrismaClient } from '@prisma/client';
import Seeder from './seeder';

export default class StatusSeeder implements Seeder {
  protected prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async seed() {
    await this.prisma.status.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'paid'
      }
    });

    await this.prisma.status.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: 'unpaid'
      }
    });
  }
}