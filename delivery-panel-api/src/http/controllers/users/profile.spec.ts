import { app } from '@/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const email = 'johndoe@vallete.com';
const password = '123456';

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
    });
    afterAll(async () => {
    await app.close();
    });

    it("should be able to get the profile details", async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email,
      password,
    });

        const authResponse = await request(app.server).post('/authenticate').send({
      email,
      password,
    });

        const { token } = authResponse.body;

        const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send();

        expect(profileResponse.statusCode).toEqual(200);
        expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email,
      }),
    );
  });
});
