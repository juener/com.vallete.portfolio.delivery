import { app } from '@/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const email = 'johndoe@vallete.com';
const password = '123456';

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
    });

    afterAll(async () => {
    await app.close();
    });

    it("should be able to authenticate", async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email,
      password,
    });

        const response = await request(app.server).post('/authenticate').send({
      email,
      password,
    });

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
      token: expect.any(String),
    });
    });
});
