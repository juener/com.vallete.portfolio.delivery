import { PrismaRestaurantsRepository } from '@/repositories/prisma/prisma-restaurants'
import { DeleteRestaurantUseCase } from '../delete-restaurant'

export function makeDeleteRestaurantUseCase() {
  const restaurantsRepository = new PrismaRestaurantsRepository()
  const useCase = new DeleteRestaurantUseCase(restaurantsRepository)

  return useCase
}
