import supertest from 'supertest';
import prisma from '../prisma/index';
import UserSeeder from '../prisma/seeders/user';
import app from '../src/app';

describe('POST /login', () => {

  describe('If the request body contains email and password', () => {

    describe('If the user exists and the password is valid', () => {

      it('Should respond with a token and status code 200', async () => {
        await new UserSeeder(prisma).seed();

        const response = await supertest(app)
          .post('/login')
          .send({ email: 'tony@soprano.com', password: 'theboss' })
          .expect(200);

        expect(response.body.token).toBeDefined();
      });
    });

    describe('If the user exists and the password is invalid', () => {

      it('Should respond with an error and status code 401', async () => {
        const expectedErrorMessage = 'Invalid email or password.';

        await new UserSeeder(prisma).seed();

        const response = await supertest(app)
          .post('/login')
          .send({ email: 'tony@soprano.com', password: 'nottheboss' })
          .expect(401);

        expect(response.body.error).toBeDefined();
        expect(response.body.error).toBe(expectedErrorMessage);
      });
    });

    describe("If the user doesn't exist", () => {
      it('Should respond with an error and status code 401', async () => {
        const expectedErrorMessage = 'Invalid email or password.';

        await new UserSeeder(prisma).seed();

        const response = await supertest(app)
          .post('/login')
          .send({ email: 'inexistent@user.com', password: 'password' })
          .expect(401);

        expect(response.body.error).toBeDefined();
        expect(response.body.error).toBe(expectedErrorMessage);
      });
    });
  });
});
