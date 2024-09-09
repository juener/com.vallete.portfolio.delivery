import { PrismaRestaurantsRepository } from '@/repositories/prisma/prisma-restaurants'
import { FetchRestaurantsUseCase } from '../fetch-restaurants'

export function makeFetchRestaurantsUseCase() {
  const restaurantsRepository = new PrismaRestaurantsRepository()
  const useCase = new FetchRestaurantsUseCase(restaurantsRepository)

  return useCase
}
