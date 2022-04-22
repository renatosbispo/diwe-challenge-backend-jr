import { PrismaClient, FinancialEntry } from '@prisma/client';

export default class FinancialEntryService {
  protected prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async create(
    userId: number,
    financialEntryData: Pick<
      FinancialEntry,
      'amount' | 'description' | 'statusId' | 'typeId'
    >
  ): Promise<FinancialEntry> {
    const financialEntry = await this.prisma.financialEntry.create({
      data: { userId, ...financialEntryData },
    });

    return financialEntry;
  }
}
