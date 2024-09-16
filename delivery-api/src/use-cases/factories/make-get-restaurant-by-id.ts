import { PrismaRestaurantsRepository } from '@/repositories/prisma/prisma-restaurants'
import { GetRestaurantByIdUseCase } from '../get-restaurant-by-id'

export function makeGetRestaurantByIdUseCase() {
  const restaurantsRepository = new PrismaRestaurantsRepository()
  const useCase = new GetRestaurantByIdUseCase(restaurantsRepository)

  return useCase
}
