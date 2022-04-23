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

  public async getOne(
    financialEntryId: string,
    userId: number
  ): Promise<FinancialEntry | null> {
    const financialEntry = await this.prisma.financialEntry.findUnique({
      where: { id: Number(financialEntryId) },
    });

    if (!financialEntry) {
      throw new ErrorWithCode('ENTITY_NOT_FOUND', 'Financial entry not found');
    }

    if (financialEntry?.userId !== userId) {
      throw new ErrorWithCode(
        'UNAUTHORIZED_OPERATION',
        'The requested financial entry does not belong to the user who requested it'
      );
    }

    return financialEntry;
  }

  public async update(
    financialEntryId: string,
    userId: number,
    newData: Pick<Partial<FinancialEntry>, 'amount' | 'statusId'>
  ): Promise<FinancialEntry> {
    await this.getOne(financialEntryId, userId);

    const parsedNewData: { [key: string]: number } = {};

    Object.entries(newData).forEach(([key, value]) => {
      if (value) {
        parsedNewData[key] = Number(value);
      }
    });

    const updatedFinancialEntry = await this.prisma.financialEntry.update({
      where: { id: Number(financialEntryId) },
      data: { ...parsedNewData },
    });

    return updatedFinancialEntry;
  }
}
