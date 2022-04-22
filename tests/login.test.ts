import supertest from 'supertest';
import prisma from '../prisma/index';
import UserSeeder from '../prisma/seeders/user';
import app from '../src/app';

describe('POST /login', () => {
  describe('If the request body contains email and password', () => {
    describe('If the user exists', () => {
      it('Should respond with a token', async () => {
        await new UserSeeder(prisma).seed();

        const response = await supertest(app)
          .post('/login')
          .send({ email: 'tony@soprano.com', password: 'theboss' })
          .expect(200);

        expect(response.body.token).toBeDefined();
      });
    });
  });
});
