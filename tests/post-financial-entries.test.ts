import supertest from 'supertest';
import prisma from '../prisma/index';
import UserSeeder from '../prisma/seeders/user';
import app from '../src/app';

describe('POST /financial-entries', () => {
  const userSeeder = new UserSeeder(prisma);

  describe('If token is missing, invalid or expired', () => {
    it('Should return an error and status code 401', async () => {
      await supertest(app).post('/financial-entries').expect(401);
    });
  });

  describe('If token is valid', () => {
    describe('If the request body contains amount, description, statusId and typeId', () => {
      it('Should create a new financial entry and respond with status code 201', async () => {
        await userSeeder.seed();

        const financialEntryData = {
          amount: 3000000,
          description: 'New car for A.J.',
          statusId: 1,
          typeId: 1,
        };

        const {
          body: { token },
        } = await supertest(app)
          .post('/login')
          .send({ email: 'tony@soprano.com', password: 'theboss' });

        await supertest(app)
          .post('/financial-entries')
          .set('Authorization', token)
          .send(financialEntryData)
          .expect(201);

        const retrievedFinancialEntry = await prisma.financialEntry.findFirst();

        expect(retrievedFinancialEntry?.amount).toBe(financialEntryData.amount);

        expect(retrievedFinancialEntry?.description).toBe(
          financialEntryData.description
        );

        expect(retrievedFinancialEntry?.statusId).toBe(
          financialEntryData.statusId
        );

        expect(retrievedFinancialEntry?.typeId).toBe(financialEntryData.typeId);
      });
    });
  });
});
