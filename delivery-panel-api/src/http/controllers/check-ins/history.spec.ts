import { app } from '@/app';
import { createAndAuthenticateUserTest } from '@/utils/test/create-and-authenticate-user';
import { createCheckInTest } from '@/utils/test/create-check-in';
import { createGymTest } from '@/utils/test/create-gym';
import { createUserTest } from '@/utils/test/create-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Check-In History (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
    });
    afterAll(async () => {
    await app.close();
    });

    it("should be able to fetch the check-ins history", async () => {
    const { token, userId } = await createAndAuthenticateUserTest(app);

        const { gym } = await createGymTest({});
        await createCheckInTest({
      userId,
      gymId: gym.id,
    });

        const { user: anotherUser } = await createUserTest({
      name: 'John Doe', // this check-in should not return on this test
      email: 'johndoe.anotherEmail@vallete.com',
      password: '123456',
    });

        await createCheckInTest({
      userId: anotherUser.id,
      gymId: gym.id,
    });

        const response = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send();

        const { checkIns } = response.body;

        expect(response.statusCode).toEqual(200);
        expect(checkIns).toHaveLength(1);
    });
});
