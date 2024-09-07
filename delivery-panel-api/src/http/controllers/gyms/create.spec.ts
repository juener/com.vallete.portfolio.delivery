import { app } from '@/app';
import { createAndAuthenticateUserTest } from '@/utils/test/create-and-authenticate-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const title = 'Gym Test e2e';
const latitude = -34.6277934;
const longitude = -58.3831004;

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
    });
    afterAll(async () => {
    await app.close();
    });

    it("should be able to create a gym", async () => {
    const { token } = await createAndAuthenticateUserTest(app, true);

        const gymResponse = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title,
        description: null,
        phone: null,
        latitude,
        longitude,
      });

        expect(gymResponse.statusCode).toEqual(201);
        expect(gymResponse.body.gym).toEqual(
      expect.objectContaining({
        title,
      }),
    );
  });
});
