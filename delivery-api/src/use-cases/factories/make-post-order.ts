import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders'
import { PostOrderUseCase } from '../post-order'

export function makePostOrderUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const useCase = new PostOrderUseCase(ordersRepository)

  return useCase
}
