import { OrdersRepository } from '@/repositories/orders-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface PostOrderUseCaseRequest {
  id?: string
  restaurantId: string
  items: {
    name: string
    price: number
    quantity: number
    obs?: string | null
  }[]
  status?:
    | 'PENDING'
    | 'WORKING'
    | 'READY_FOR_PICKUP'
    | 'ON_THE_WAY'
    | 'DELIVERED'
    | 'CANCELED'
    | null
}

interface PostOrderUseCaseResponse {
  id?: string
  restaurantId: string
  items: {
    name: string
    price: number
    quantity: number
    obs?: string | null
  }[]
  status?:
    | 'PENDING'
    | 'WORKING'
    | 'READY_FOR_PICKUP'
    | 'ON_THE_WAY'
    | 'DELIVERED'
    | 'CANCELED'
    | null
}

export class PostOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    id,
    restaurantId,
    items,
    status,
  }: PostOrderUseCaseRequest): Promise<PostOrderUseCaseResponse> {
    const order = await this.ordersRepository.post({
      id,
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      status,
    })

    if (!order) {
      throw new ResourceNotFoundError()
    }

    const orderItems = await this.ordersRepository.addItemsToOrder(
      order.id,
      items,
    )

    if (!orderItems) {
      throw new ResourceNotFoundError()
    }

    return {
      id: order.id,
      restaurantId: order.restaurantId,
      items: orderItems,
      status: order.status,
    }
  }
}
