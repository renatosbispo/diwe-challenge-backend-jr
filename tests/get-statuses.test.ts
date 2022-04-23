import supertest from 'supertest';
import prisma from '../prisma/index';
import StatusSeeder from '../prisma/seeders/status';
import UserSeeder from '../prisma/seeders/user';
import app from '../src/app';

describe('GET /statuses', () => {
  const statusSeeder = new StatusSeeder(prisma);
  const userSeeder = new UserSeeder(prisma);

  describe('If token is missing, invalid or expired', () => {
    it('Should return an error and status code 401', async () => {
      await supertest(app).get('/statuses').expect(401);
    });
  });

  describe('If token is valid', () => {
    it("Should return a list with the statuses 'paid' and 'unpaid' with status code 200", async () => {
      await statusSeeder.seed();
      await userSeeder.seed();

      const expectedStatuses = await prisma.status.findMany();

      const {
        body: { token },
      } = await supertest(app)
        .post('/login')
        .send({ email: 'tony@soprano.com', password: 'theboss' });

      const response = await supertest(app)
        .get('/statuses')
        .set('Authorization', token)
        .expect(200);

      expect(response.body).toEqual(expectedStatuses);
    });
  });
});
