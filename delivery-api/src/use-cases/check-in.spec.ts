import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CheckInUseCase } from './check-in';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms';
import { Decimal } from '@prisma/client/runtime/library';
import { MaxNumberOfCheckIns } from './errors/max-number-of-check-ins';
import { ResourceNotFoundError } from './errors/resource-not-found';
import { MaxDistanceError } from './errors/max-distance';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

const gymId = 'gym-001';

const gymLatitude = new Decimal(51.7504091);
const gymLongitude = new Decimal(-1.2887871);

const userIsNextToGymLatitude = gymLatitude.toNumber();
const userIsNextToGymLongitude = gymLongitude.toNumber();

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
        gymsRepository = new InMemoryGymsRepository();
        sut = new CheckInUseCase(checkInsRepository, gymsRepository);

        gymsRepository.items.push({
      id: gymId,
      title: 'Gym Title for Tests',
      description: '',
      phone: '',
      latitude: gymLatitude,
      longitude: gymLongitude,
    });

        vi.useFakeTimers();

        vi.setSystemTime(new Date(2024, 0, 1, 5, 0, 0));
    });

    afterEach(() => {
    vi.useRealTimers();
    });

    it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      userId: '1',
      gymId,
      userLatitude: userIsNextToGymLatitude,
      userLongitude: userIsNextToGymLongitude,
    });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it("should not be able to check in twice on the same day", async () => {
    await sut.execute({
      userId: '1',
      gymId,
      userLatitude: userIsNextToGymLatitude,
      userLongitude: userIsNextToGymLongitude,
    });

        await expect(() =>
      sut.execute({
        userId: '1',
        gymId,
        userLatitude: userIsNextToGymLatitude,
        userLongitude: userIsNextToGymLongitude,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckIns);
    });

    it("should be able to check in twice on different days", async () => {
    await sut.execute({
      userId: '1',
      gymId,
      userLatitude: userIsNextToGymLatitude,
      userLongitude: userIsNextToGymLongitude,
    });

        vi.setSystemTime(new Date(2024, 0, 22, 8, 0, 0));

        const { checkIn } = await sut.execute({
      userId: '1',
      gymId,
      userLatitude: userIsNextToGymLatitude,
      userLongitude: userIsNextToGymLongitude,
    });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it("should not be able to check in at the gym that does not exist", async () => {
    await expect(() =>
      sut.execute({
        userId: '1',
        gymId: 'non-existent-gym-id',
        userLatitude: userIsNextToGymLatitude,
        userLongitude: userIsNextToGymLongitude,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

    it("should not be able to check in further from the gym", async () => {
    await expect(() =>
      sut.execute({
        userId: '1',
        gymId,
        userLatitude: 51.5285262,
        userLongitude: -0.2664021,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError);
    });
});
