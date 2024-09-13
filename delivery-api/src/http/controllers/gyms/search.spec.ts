import { app } from '@/app';
import { createAndAuthenticateUserTest } from '@/utils/test/create-and-authenticate-user';
import { createGymTest } from '@/utils/test/create-gym';
import { Decimal } from '@prisma/client/runtime/library';
import request from 'supertest';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const queryTest = 'Special';
const gymTest = `Gym Test ${queryTest} 001`;

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
    });
    afterAll(async () => {
    await app.close();
    });

    it("should be able to search for gyms by query", async () => {
    const { token } = await createAndAuthenticateUserTest(app);

        await createGymTest({
      title: gymTest, // first gym
    });

        await createGymTest({
      title: 'Gym Test Common 002', // second gym
    });

        const response = await request(app.server)
      .get('/gyms/search')
      .query({ query: queryTest, page: 1 })
      .set('Authorization', `Bearer ${token}`)
      .send();

        const { gyms } = response.body;

        expect(response.statusCode).toEqual(200);
        expect(gyms).toHaveLength(1);
        expect(gyms[0].title).toEqual(gymTest);
    // expect(gyms).toEqual([
    //   expect.objectContaining({
    //     latitude: expect.any(Decimal),
    //     longitude: expect.any(Decimal),
    //   }),
    // ]) //TODO: make latitude and longitude as number instead of string
    });
});
