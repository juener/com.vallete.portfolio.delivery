import { app } from '@/app';
import { createAndAuthenticateUserTest } from '@/utils/test/create-and-authenticate-user';
import { createGymTest } from '@/utils/test/create-gym';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Create a check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
    });
    afterAll(async () => {
    await app.close();
    });

    it("should be able to check in", async () => {
    const { token } = await createAndAuthenticateUserTest(app);

        const { gym } = await createGymTest({
      latitude: 40.7128,
      longitude: -74.006,
    });

        const response = await request(app.server)
      .post('/check-ins')
      .set('Authorization', `Bearer ${token}`)
      .send({
        gymId: gym.id,
        latitude: 40.7128, // 50 meters far from the gym
        longitude: -74.0059,
      });

        const { checkIn } = response.body;

        expect(response.statusCode).toEqual(200);
        expect(checkIn.id).toEqual(expect.any(String));
    });
});
