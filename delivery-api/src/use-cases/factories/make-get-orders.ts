import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders'
import { GetOrdersUseCase } from '../get-orders'

export function makeGetOrdersUseCase() {
  const ordersRepository = new PrismaOrdersRepository()
  const useCase = new GetOrdersUseCase(ordersRepository)

  return useCase
}
