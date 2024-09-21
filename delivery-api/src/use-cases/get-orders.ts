import { RestaurantsRepository } from '@/repositories/restaurants-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { Order } from '@prisma/client'
import {
  OrdersRepository,
  OrdersWithChildren,
} from '@/repositories/orders-repository'

interface GetOrdersUseCaseResponse {
  orders: OrdersWithChildren[]
}

function calculateItemsOrderTotal(order: OrdersWithChildren): number {
  const itemsTotal = order.items.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  return Math.round(itemsTotal * 100) / 100
}

export class GetOrdersUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute(): Promise<GetOrdersUseCaseResponse> {
    const orders = await this.ordersRepository.getOrders()

    const ordersWithTotal = orders.map((order) => {
      const totalItems = calculateItemsOrderTotal(order)
      const total = totalItems //TODO: discounts, fees, etc

      return {
        ...order,
        totalItems,
        total,
      }
    })

    if (!orders) {
      throw new ResourceNotFoundError()
    }

    return {
      orders: ordersWithTotal,
    }
  }
}
