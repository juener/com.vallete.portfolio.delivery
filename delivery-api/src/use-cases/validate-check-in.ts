import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'
import dayjs from 'dayjs'
import { MaxTimeExceeded } from './errors/max-time-exceeded'

interface ValidadeCheckInUseCaseRequest {
  checkInId: string
}

interface ValidadeCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidadeCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidadeCheckInUseCaseRequest): Promise<ValidadeCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    checkIn.validatedAt = new Date()

    const differenceOfMinutesBetweenCheckInAndValidation = dayjs(
      checkIn.validatedAt,
    ).diff(checkIn.createdAt, 'minutes')

    const MAXIMUM_TIME_TO_CHECK_IN_IN_MINUTES = 30

    if (
      differenceOfMinutesBetweenCheckInAndValidation >
      MAXIMUM_TIME_TO_CHECK_IN_IN_MINUTES
    ) {
      throw new MaxTimeExceeded()
    }

    await this.checkInsRepository.save(checkIn)

    return { checkIn }
  }
}
