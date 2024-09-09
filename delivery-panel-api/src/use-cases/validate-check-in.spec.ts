import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ValidadeCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { MaxTimeExceeded } from './errors/max-time-exceeded'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidadeCheckInUseCase

const dummyCheckInId = 'dummy-check-in-id'

describe('Validate Check-In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidadeCheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
    vi.setSystemTime(new Date(2024, 0, 1, 10, 0, 0))

    checkInsRepository.items.push({
      id: dummyCheckInId,
      createdAt: new Date(),
      gymId: 'dummy-gym-id',
      userId: 'dummy-user-id',
      validatedAt: null,
    })
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('should validate some specific check-in', async () => {
    const { checkIn } = await sut.execute({
      checkInId: dummyCheckInId,
    })

    expect(checkIn.validatedAt).toEqual(expect.any(Date))
  })

  it('should not be able to validade a non-existent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'non-existent-check-in',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate a check-in after 30 minutes', async () => {
    const MINUTES_TO_ADVANCE_IN_MILLISECONDS = 1000 * 60 * 35 // 35 minutes
    vi.advanceTimersByTime(MINUTES_TO_ADVANCE_IN_MILLISECONDS)

    await expect(() =>
      sut.execute({
        checkInId: dummyCheckInId,
      }),
    ).rejects.toBeInstanceOf(MaxTimeExceeded)
  })
})
