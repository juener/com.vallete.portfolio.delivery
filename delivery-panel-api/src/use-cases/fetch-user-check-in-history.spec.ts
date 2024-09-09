import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserCheckInHistoryUseCase } from './fetch-user-check-in-history'
import { randomUUID } from 'crypto'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInHistoryUseCase

const dummyUserId = 'dummy-user-id'

describe('Fetch User Check In History Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInHistoryUseCase(checkInsRepository)

    for (let i = 1; i <= 23; i++) {
      checkInsRepository.items.push({
        id: randomUUID(),
        gymId: `dummy-gym-id-${i}`,
        userId: dummyUserId,
        createdAt: new Date(),
        validatedAt: null,
      })
    }
  })

  it('should return the history of check-ins by a specific user', async () => {
    const { checkIns } = await sut.execute({
      userId: dummyUserId,
      page: 1,
    })

    expect(checkIns).toHaveLength(20)
    expect(checkIns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ userId: dummyUserId }),
        expect.objectContaining({ gymId: 'dummy-gym-id-20' }),
      ]),
    )
  })

  it('should be able to be paginated when fetching', async () => {
    const { checkIns } = await sut.execute({
      userId: dummyUserId,
      page: 2,
    })

    expect(checkIns).toHaveLength(3)
  })
})
