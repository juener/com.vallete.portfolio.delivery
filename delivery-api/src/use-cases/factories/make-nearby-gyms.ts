import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms';
import { FetchNearbyGymsUseCase } from '../fetch-gyms-nearby';

export function makeNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
    const useCase = new FetchNearbyGymsUseCase(gymsRepository);

    return useCase;
}
