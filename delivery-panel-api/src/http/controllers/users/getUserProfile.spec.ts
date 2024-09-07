import { app } from '@/app';
import { createAndAuthenticateUserTest } from '@/utils/test/create-and-authenticate-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Get User Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
    });
    afterAll(async () => {
    await app.close();
    });

    it(async () => {
    const { token } = await createAndAuthenticateUserTest(app);

        const response = await request(app.server)
      .get('/me')
      .set('Authentication', `Bearer ${token}`);

        const { id: userId } = response.body;

        expect(response.statusCode).toEqual(200);
        expect(userId).toEqual(expect.any(String));
    });
});
