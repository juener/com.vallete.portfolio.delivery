import { app } from '@/app';
import { createAndAuthenticateUserTest } from '@/utils/test/create-and-authenticate-user';
import { createCheckInTest } from '@/utils/test/create-check-in';
import { createGymTest } from '@/utils/test/create-gym';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Validate the Check In (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
    });
    afterAll(async () => {
    await app.close();
    });

    it("should be able to validate a specific check-in", async () => {
    const { token, userId } = await createAndAuthenticateUserTest(app, true);

        const { gym } = await createGymTest({});

        const { checkIn: createdCheckIn } = await createCheckInTest({
      userId,
      gymId: gym.id,
    });

        const response = await request(app.server)
      .patch(`/check-ins/${createdCheckIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`);

        const { checkIn } = response.body;

        expect(response.statusCode).toEqual(200);
        expect(checkIn.id).toEqual(expect.any(String));
    });
});
