import { PrismaClient, Status } from '@prisma/client';

export default class StatusService {
  protected prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async getAll(): Promise<Status[]> {
    const statuses = await this.prisma.status.findMany();

    return statuses;
  }
}
