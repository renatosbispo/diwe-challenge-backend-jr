import supertest from 'supertest';
import prisma from '../prisma/index';
import TypeSeeder from '../prisma/seeders/type';
import UserSeeder from '../prisma/seeders/user';
import app from '../src/app';

describe('GET /types', () => {
  const typeSeeder = new TypeSeeder(prisma);
  const userSeeder = new UserSeeder(prisma);

  describe('If token is missing, invalid or expired', () => {
    it('Should return an error and status code 401', async () => {
      await supertest(app).get('/types').expect(401);
    });
  });

  describe('If token is valid', () => {
    it("Should return a list with the types 'expense' and 'income'", async () => {
      await typeSeeder.seed();
      await userSeeder.seed();

      const { body: { token } } = await supertest(app)
        .post('/login')
        .send({ email: 'tony@soprano.com', password: 'theboss' });

      const response = await supertest(app)
        .get('/types')
        .set('Authorization', token)
        .expect(200);

      expect(response).toEqual(['expense', 'income']);
    });
  });
});
