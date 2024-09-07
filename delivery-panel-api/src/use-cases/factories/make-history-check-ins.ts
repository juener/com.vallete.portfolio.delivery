import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins';
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms';
import { FetchUserCheckInHistoryUseCase } from '../fetch-user-check-in-history';

export function makeHistoryCheckInsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
    const useCase = new FetchUserCheckInHistoryUseCase(checkInsRepository);

    return useCase;
}
