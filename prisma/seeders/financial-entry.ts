import { PrismaClient } from '@prisma/client';
import Seeder from './seeder';

export default class FinancialEntrySeeder implements Seeder {
  protected prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async seed() {
    await this.prisma.financialEntry.upsert({
      where: { id: 1 },
      update: {},
      create: {
        statusId: 1,
        userId: 1,
        typeId: 1,
        amount: 3000000,
        description: 'New car for A.J.',
      },
    });

    await this.prisma.financialEntry.upsert({
      where: { id: 2 },
      update: {},
      create: {
        statusId: 1,
        userId: 2,
        typeId: 2,
        amount: 150000,
        description: "Vesuvio's wage",
      },
    });

    await this.prisma.financialEntry.upsert({
      where: { id: 3 },
      update: {},
      create: {
        statusId: 2,
        userId: 3,
        typeId: 1,
        amount: 1200000,
        description: "Next week's envelope",
      },
    });
  }
}
