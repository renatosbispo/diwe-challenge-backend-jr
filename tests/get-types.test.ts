import supertest from 'supertest';
import prisma from '../prisma/index';
import app from '../src/app';

describe('GET /types', () => {
  it('The response body should contain a list with all types', async () => {
    const expense = await prisma.type.create({ data: { name: 'expense' } });
    const income = await prisma.type.create({ data: { name: 'income' } });
    const expectedResponseBody = [expense, income].map(({ name }) => name);

    const response = await supertest(app).get('/types').expect(200);

    expect(response.body).toEqual(expectedResponseBody);
  });
});
