import { FinancialEntry } from '@prisma/client';
import supertest from 'supertest';
import prisma from '../prisma/index';
import FinancialEntrySeeder from '../prisma/seeders/financial-entry';
import StatusSeeder from '../prisma/seeders/status';
import TypeSeeder from '../prisma/seeders/type';
import UserSeeder from '../prisma/seeders/user';
import app from '../src/app';

describe('GET /financial-entries/{id}', () => {
  const statusSeeder = new StatusSeeder(prisma);
  const typeSeeder = new TypeSeeder(prisma);
  const userSeeder = new UserSeeder(prisma);
  const financialEntrySeeder = new FinancialEntrySeeder(prisma);

  describe('If token is missing, invalid or expired', () => {
    it('Should return an error and status code 401', async () => {
      await supertest(app).get('/financial-entries/1').expect(401);
    });
  });

  describe('If token is valid', () => {
    let token: string;

    beforeEach(async () => {
      await statusSeeder.seed();
      await typeSeeder.seed();
      await userSeeder.seed();
      await financialEntrySeeder.seed();

      const response = await supertest(app)
        .post('/login')
        .send({ email: 'tony@soprano.com', password: 'theboss' });

      token = response.body.token;

      await supertest(app)
        .post('/financial-entries')
        .set('Authorization', token)
        .send({
          amount: 200000,
          description: 'Golden ring for Carmela',
          statusId: 1,
          typeId: 1,
        });
    });

    describe('If the params.id is valid', () => {
      it('Should return only the financial entry of the user that matches the param id with status code 200', async () => {
        const response = await supertest(app)
          .get('/financial-entries/4')
          .set('Authorization', token)
          .expect(200);

        const receivedFinancialEntry: FinancialEntry = response.body;

        expect(receivedFinancialEntry.userId).toBe(1);
        expect(receivedFinancialEntry.id).toBe(4);
      });
    });

    describe('If the params.id is valid but does not correspond to an existing entity', () => {
      it('Should return an error and status code 404', async () => {
        const response = await supertest(app)
          .get('/financial-entries/99999')
          .set('Authorization', token)
          .expect(404);

        expect(response.body.error).toBeDefined();
      });
    });

    describe('If the params.id is invalid', () => {
      it('Should return an error and status code 422', async () => {
        const response = await supertest(app)
          .get('/financial-entries/not-a-number')
          .set('Authorization', token)
          .expect(422);

        expect(response.body.error).toBeDefined();
      });
    });
  });
});
