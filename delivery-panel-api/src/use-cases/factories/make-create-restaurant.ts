import { PrismaRestaurantsRepository } from '@/repositories/prisma/prisma-restaurants';
import { CreateRestaurantUseCase } from '../create-restaurant';

export function makeCreateRestaurantUseCase() {
  const restaurantsRepository = new PrismaRestaurantsRepository();
    const useCase = new CreateRestaurantUseCase(restaurantsRepository);

    return useCase;
}
