import { app } from '@/app';
import request from 'supertest';
import { createAndAuthenticateUserTest } from '@/utils/test/create-and-authenticate-user';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createCheckInTest } from '@/utils/test/create-check-in';
import { createGymTest } from '@/utils/test/create-gym';

describe('User Metrics (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
    });
    afterAll(async () => {
    await app.close();
    });

    it("should be able to return the user metrics", async () => {
    const { token, userId } = await createAndAuthenticateUserTest(app);

        const { gym } = await createGymTest({});

        await createCheckInTest({
      userId,
      gymId: gym.id,
    });
        const response = await request(app.server)
      .get('/users/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send();

        const { checkInsCount } = response.body;

        expect(response.statusCode).toEqual(200);
        expect(checkInsCount).toEqual(1);
    });
});
