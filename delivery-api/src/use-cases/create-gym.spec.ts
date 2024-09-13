import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateGymUseCase } from './create-gym';

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

const title = 'Gym Title for Test';
const latitude = 51.9279573;
const longitude = 4.4084285;

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
        sut = new CreateGymUseCase(gymsRepository);
    });

    it("should be able to create a new gym", async () => {
    const { gym } = await sut.execute({
      title,
      description: null,
      phone: '',
      latitude,
      longitude,
    });

        expect(gym.id).toEqual(expect.any(String));
    });
});
