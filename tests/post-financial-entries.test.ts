import supertest, { Response } from 'supertest';
import prisma from '../prisma/index';
import StatusSeeder from '../prisma/seeders/status';
import TypeSeeder from '../prisma/seeders/type';
import UserSeeder from '../prisma/seeders/user';
import app from '../src/app';

describe('POST /financial-entries', () => {
  const statusSeeder = new StatusSeeder(prisma);
  const typeSeeder = new TypeSeeder(prisma);
  const userSeeder = new UserSeeder(prisma);

  describe('If token is missing, invalid or expired', () => {
    it('Should return an error and status code 401', async () => {
      await supertest(app).post('/financial-entries').expect(401);
    });
  });

  describe('If token is valid', () => {
    let token: string;

    beforeEach(async () => {
      await statusSeeder.seed();
      await typeSeeder.seed();
      await userSeeder.seed();

      const response = await supertest(app)
        .post('/login')
        .send({ email: 'tony@soprano.com', password: 'theboss' });

      token = response.body.token;
    });

    describe('If the request body contains amount, description, statusId and typeId', () => {
      const financialEntryData = {
        amount: 3000000,
        description: 'New car for A.J.',
        statusId: 1,
        typeId: 1,
      };

      let response: Response;

      beforeEach(async () => {
        response = await supertest(app)
          .post('/financial-entries')
          .set('Authorization', token)
          .send(financialEntryData)
          .expect(201);
      });

      it('Should create a new financial entry and respond with status code 201', async () => {
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

      it('The response body should contain the financial entry data sent in the request', async () => {
        expect(response.body).toMatchObject(financialEntryData);
      });
    });

    describe('If the request body contains invalid information', () => {
      it('Should return an error and status code 422', async () => {
        const responses = await Promise.all([
          // Invalid amount type
          supertest(app)
            .post('/financial-entries')
            .set('Authorization', token)
            .send({
              amount: 'string',
              description: 'Proper description',
              statusId: 1,
              typeId: 2,
            })
            .expect(422),
          // Invalid amount format
          supertest(app)
            .post('/financial-entries')
            .set('Authorization', token)
            .send({
              amount: 10.59,
              description: 'Proper description',
              statusId: 1,
              typeId: 2,
            })
            .expect(422),
          // Invalid description type
          supertest(app)
            .post('/financial-entries')
            .set('Authorization', token)
            .send({
              amount: 1000,
              description: 1,
              statusId: 1,
              typeId: 2,
            })
            .expect(422),
          // Invalid statusId type
          supertest(app)
            .post('/financial-entries')
            .set('Authorization', token)
            .send({
              amount: 1000,
              description: 'Proper description',
              statusId: 'string',
              typeId: 2,
            })
            .expect(422),
          // Inexistent statusId
          supertest(app)
            .post('/financial-entries')
            .set('Authorization', token)
            .send({
              amount: 1000,
              description: 'Proper description',
              statusId: 99,
              typeId: 2,
            })
            .expect(422),
          // Invalid typeId type
          supertest(app)
            .post('/financial-entries')
            .set('Authorization', token)
            .send({
              amount: 1000,
              description: 'Proper description',
              statusId: 1,
              typeId: 'string',
            })
            .expect(422),
          // Inexistent typeId
          supertest(app)
            .post('/financial-entries')
            .set('Authorization', token)
            .send({
              amount: 1000,
              description: 'Proper description',
              statusId: 1,
              typeId: 99,
            })
            .expect(422),
        ]);

        responses.forEach((response) =>
          expect(response.body.error).toBeDefined()
        );
      });
    });
  });
});
