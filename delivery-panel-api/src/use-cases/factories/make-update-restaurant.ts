import { PrismaRestaurantsRepository } from '@/repositories/prisma/prisma-restaurants'
import { UpdateRestaurantUseCase } from '../update-restaurant'

export function makeUpdateRestaurantUseCase() {
  const restaurantsRepository = new PrismaRestaurantsRepository()
  const useCase = new UpdateRestaurantUseCase(restaurantsRepository)

  return useCase
}
