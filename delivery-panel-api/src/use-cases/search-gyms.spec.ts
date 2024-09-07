import { beforeEach, describe, expect, it } from 'vitest';
import { SearchGymsUseCase } from './search-gyms';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms';
import { randomUUID } from 'crypto';
import { Decimal } from '@prisma/client/runtime/library';

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

const gymTitle = 'Gym for the use case test';

describe('Search Gyms Use Case', async () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
        sut = new SearchGymsUseCase(gymsRepository);

        gymsRepository.items.push({
      id: randomUUID(),
      title: gymTitle,
      description: null,
      phone: null,
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    });
    });

    it("should search and find a registered gym using a key word", async () => {
    const { gyms } = await sut.execute({
      query: 'test',
      page: 1,
    });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
      expect.objectContaining({
        title: gymTitle,
      }),
    ]);
    });
});
