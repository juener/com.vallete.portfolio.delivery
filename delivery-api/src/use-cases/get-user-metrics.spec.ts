import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins'
import { randomUUID } from 'crypto'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

const userId = 'dummy-user-id-001'

describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)

    checkInsRepository.items.push({
      id: randomUUID(),
      gymId: 'dummy-gym-id-001',
      userId,
      createdAt: new Date(),
      validatedAt: null,
    })
  })

  it('should be able to get the count of check-ins from metrics', async () => {
    const userMetrics = await sut.execute({ userId })

    expect(userMetrics.checkInsCount).toBe(1)
  })
})
