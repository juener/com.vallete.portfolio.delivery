import { app } from '@/app';
import { createAndAuthenticateUserTest } from '@/utils/test/create-and-authenticate-user';
import { createGymTest } from '@/utils/test/create-gym';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const latitudeCreated = 40.73061;
const longitudeCreated = -73.935242;

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
    });
    afterAll(async () => {
    await app.close();
    });

    it("should be able to fetch the gyms nearby", async () => {
    const { token } = await createAndAuthenticateUserTest(app);

        await createGymTest({
      latitude: latitudeCreated, // first gym
      longitude: longitudeCreated,
    });

        await createGymTest({
      latitude: 51.6026392, // second gym
      longitude: 7.0897082, // that's 10KM+ far from the first gym
    });

        const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: 40.6862, // that's up to 10KM far from the first gym
        longitude: -73.99596,
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

        const { gyms } = response.body;

        expect(response.status).toEqual(200);
        expect(gyms).toEqual([
      expect.objectContaining({
        latitude: latitudeCreated.toString(),
        longitude: longitudeCreated.toString(),
      }),
    ]);
    });
});
