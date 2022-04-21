import { PrismaClient } from '@prisma/client';
import Seeder from './seeder';

export default class TypeSeeder implements Seeder {
  protected prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async seed() {
    console.log('Seeding types...');

    await this.prisma.type.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'expense'
      }
    });

    await this.prisma.type.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: 'income'
      }
    });
  }
}