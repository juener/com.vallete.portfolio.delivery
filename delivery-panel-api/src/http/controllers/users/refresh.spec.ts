import { app } from '@/app';
import { createUserTest } from '@/utils/test/create-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const email = 'johndoe@vallete.com';
const password = '123456';

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
    });
    afterAll(async () => {
    await app.close();
    });

    it("should be able to refresh a token", async () => {
    await createUserTest({
      name: 'John Doe',
      email,
      password,
    });

        const authResponse = await request(app.server).post('/authenticate').send({
      email,
      password,
    });

        const cookies = authResponse.get('Set-Cookie')!;

        const response = await request(app.server)
      .patch('/refresh/token')
      .set('Cookie', cookies)
      .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
      token: expect.any(String),
    });
        expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ]);
    });
});
