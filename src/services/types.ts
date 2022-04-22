import { PrismaClient, Type } from '@prisma/client';

export default class TypeService {
  protected prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async getAll(): Promise<Type[]> {
    const types = await this.prisma.type.findMany();

    return types;
  }
}
