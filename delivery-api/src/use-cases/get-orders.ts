import { RestaurantsRepository } from '@/repositories/restaurants-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { Order } from '@prisma/client'
import { OrdersRepository } from '@/repositories/orders-repository'

interface GetOrdersUseCaseResponse {
  orders: Order[]
}

export class GetOrdersUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute(): Promise<GetOrdersUseCaseResponse> {
    const orders = await this.ordersRepository.getOrders()

    if (!orders) {
      throw new ResourceNotFoundError()
    }

    return {
      orders,
    }
  }
}
