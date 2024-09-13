import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins';
import { ValidadeCheckInUseCase } from '../validate-check-in';

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
    const useCase = new ValidadeCheckInUseCase(checkInsRepository);

    return useCase;
}
