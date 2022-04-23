import supertest, { Response } from 'supertest';
import prisma from '../prisma/index';
import FinancialEntrySeeder from '../prisma/seeders/financial-entry';
import StatusSeeder from '../prisma/seeders/status';
import TypeSeeder from '../prisma/seeders/type';
import UserSeeder from '../prisma/seeders/user';
import app from '../src/app';

describe('DELETE /financial-entries/{id}', () => {
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
      let response: Response;

      beforeEach(async () => {
        response = await supertest(app)
          .delete('/financial-entries/1')
          .set('Authorization', token)
      });

      it('Should delete the financial entry of the user that matches the param id and return status code 204', async () => {
        const financialEntry = await prisma.financialEntry.findUnique({ where: { id: 1 } });

        expect(financialEntry).toBeNull();
        expect(response.statusCode).toBe(204);
      });
    });

    describe('If the params.id is invalid', () => {
      it('Should return an error and status code 422', async () => {
        const response = await supertest(app)
          .delete('/financial-entries/not-a-number')
          .set('Authorization', token)
          .expect(422);

        expect(response.body.error).toBeDefined();
      });
    });
  });
});
