import { PrismaClient, FinancialEntry } from '@prisma/client';
import ErrorWithCode from '../lib/error-with-code';

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
    const { statusId, typeId } = financialEntryData;

    const statusIdExists = await this.prisma.status.findUnique({
      where: { id: statusId },
    });

    const typeIdExists = await this.prisma.type.findUnique({
      where: { id: typeId },
    });

    if (!statusIdExists || !typeIdExists) {
      throw new ErrorWithCode(
        'ENTITY_PROPERTY_INVALID',
        'Inexistent type or status id'
      );
    }

    const financialEntry = await this.prisma.financialEntry.create({
      data: { userId, ...financialEntryData },
    });

    return financialEntry;
  }

  public async getAll(userId: number): Promise<FinancialEntry[]> {
    const financialEntries = await this.prisma.financialEntry.findMany({
      where: { userId },
    });

    return financialEntries;
  }
}
