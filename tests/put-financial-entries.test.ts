import { FinancialEntry } from '@prisma/client';
import supertest, { Response } from 'supertest';
import prisma from '../prisma/index';
import FinancialEntrySeeder from '../prisma/seeders/financial-entry';
import StatusSeeder from '../prisma/seeders/status';
import TypeSeeder from '../prisma/seeders/type';
import UserSeeder from '../prisma/seeders/user';
import app from '../src/app';

describe('PUT /financial-entries/{id}', () => {
  const statusSeeder = new StatusSeeder(prisma);
  const typeSeeder = new TypeSeeder(prisma);
  const userSeeder = new UserSeeder(prisma);
  const financialEntrySeeder = new FinancialEntrySeeder(prisma);

  describe('If token is missing, invalid or expired', () => {
    it('Should return an error and status code 401', async () => {
      await supertest(app).get('/financial-entries').expect(401);
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
    });

    describe('If the params.id is valid and correspond to an existing entity', () => {
      const newFinancialEntryData = {
        amount: 4000000,
      };

      let response: Response;

      beforeEach(async () => {
        response = await supertest(app)
          .put('/financial-entries/1')
          .set('Authorization', token)
          .send(newFinancialEntryData);
      });

      it('Should update the financial entry of the user that matches the param id and return status code 200', async () => {
        const receivedFinancialEntry: FinancialEntry = response.body;

        expect(receivedFinancialEntry.userId).toBe(1);
        expect(receivedFinancialEntry.id).toBe(1);

        expect(receivedFinancialEntry.amount).toBe(
          newFinancialEntryData.amount
        );

        expect(response.statusCode).toBe(200);
      });
    });

    describe('If the params.id is invalid', () => {
      it('Should return an error and status code 422', async () => {
        const response = await supertest(app)
          .put('/financial-entries/not-a-number')
          .set('Authorization', token)
          .expect(422);

        expect(response.body.error).toBeDefined();
      });
    });

    describe('If the request body contains invalid data', () => {
      it('Should return an error and status code 422', async () => {
        const responses = await Promise.all([
          supertest(app)
            .put('/financial-entries/1')
            .set('Authorization', token)
            .send({ amount: 'string', statusId: 2 })
            .expect(422),
          supertest(app)
            .put('/financial-entries/1')
            .set('Authorization', token)
            .send({ amount: 5000000, statusId: 'string' })
            .expect(422),
        ]);

        responses.forEach((response) => {
          expect(response.body.error).toBeDefined();
        });
      });
    });
  });
});
