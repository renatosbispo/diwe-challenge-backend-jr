import { PrismaClient } from '@prisma/client';
import { CryptoService } from '../../src/services';
import Seeder from './seeder';

export default class UserSeeder implements Seeder {
  protected prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async seed() {
    console.log('Seeding users...');

    await this.prisma.user.upsert({
      where: { id: 1 },
      update: {},
      create: {
        fullName: 'Tony Soprano',
        email: 'tony@soprano.com',
        password: await CryptoService.hash('theboss'),
      },
    });

    await this.prisma.user.upsert({
      where: { id: 2 },
      update: {},
      create: {
        fullName: 'Adriana La Cerva',
        email: 'adriana@lacerva.com',
        password: await CryptoService.hash('ilovechris'),
      },
    });

    await this.prisma.user.upsert({
      where: { id: 3 },
      update: {},
      create: {
        fullName: 'Silvio Dante',
        email: 'silvio@dante.com',
        password: await CryptoService.hash('pullmebackin'),
      },
    });
  }
}
