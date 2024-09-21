import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders'
import { PostOrderUseCase } from '../post-order'
import { PrismaRestaurantsRepository } from '@/repositories/prisma/prisma-restaurants'

export function makePostOrderUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const restaurantRepository = new PrismaRestaurantsRepository()
  const useCase = new PostOrderUseCase(ordersRepository, restaurantRepository)

  return useCase
}
