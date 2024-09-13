import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms';
import { beforeEach, describe, expect, it } from 'vitest';
import { FetchNearbyGymsUseCase } from './fetch-gyms-nearby';
import { randomUUID } from 'crypto';
import { Decimal } from '@prisma/client/runtime/library';

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

const userLatitude = 51.9279573;
const userLongitude = 4.4084285;

const gymLatitudeNearby = 51.9390353;
const gymLongitudeNearby = 4.4579274;

const gymLatitudeFurther = 51.9388937;
const gymLongitudeFurther = 6.1359302;

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
        sut = new FetchNearbyGymsUseCase(gymsRepository);

        gymsRepository.items.push({
      id: randomUUID(),
      title: 'Gym with the latitude next to the user',
      description: null,
      phone: null,
      latitude: new Decimal(gymLatitudeNearby),
      longitude: new Decimal(gymLongitudeNearby),
    });

        gymsRepository.items.push({
      id: randomUUID(),
      title: 'Gym with latitude far from the user',
      description: null,
      phone: null,
      latitude: new Decimal(gymLatitudeFurther),
      longitude: new Decimal(gymLongitudeFurther),
    });
    });

    it("should return gyms nearby the user location", async () => {
    const { gyms } = await sut.execute({
      userLatitude,
      userLongitude,
    });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Gym with the latitude next to the user',
      }),
    ]);
    });
});
