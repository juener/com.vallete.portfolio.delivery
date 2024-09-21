import { OrdersRepository } from '@/repositories/orders-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { Restaurant } from '@prisma/client'
import { a } from 'vitest/dist/suite-ynYMzeLu'
import { RestaurantsRepository } from '@/repositories/restaurants-repository'

interface PostOrderUseCaseRequest {
  id?: string | undefined
  restaurantId: string
  customer: {
    name: string
    phoneNumber: string
    address: {
      street: string
      number: string
      complement?: string
      reference?: string
      neighborhood: string
      city?: string
    }
  }
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
  customer: {
    name: string
    phoneNumber: string
    address: {
      street: string
      number: string
      complement?: string
      reference?: string
      neighborhood: string
      city?: string
    }
  }
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
  constructor(
    private ordersRepository: OrdersRepository,
    private restaurantsRepository: RestaurantsRepository,
  ) {}

  async execute({
    id,
    restaurantId,
    customer,
    items,
    status,
  }: PostOrderUseCaseRequest): Promise<PostOrderUseCaseResponse> {
    // const customerRecord = await this.ordersRepository.post({
    //   name: customer.name,
    //   phoneNumber: customer.phoneNumber,
    //   address: {
    //     create: {
    //       street: customer.address.street,
    //       number: customer.address.number,
    //       complement: customer.address.complement,
    //       reference: customer.address.reference,
    //       neighborhood: customer.address.neighborhood,
    //       city: customer.address.city,
    //     },
    //   },
    // })

    // if (!customerRecord) {
    //   throw new ResourceNotFoundError()
    // }

    const restaurant =
      this.restaurantsRepository.getRestaurantById(restaurantId)

    if (!restaurant) {
      throw new ResourceNotFoundError()
    }

    const order = await this.ordersRepository.post({
      id,
      customer: {
        name: customer.name,
        phoneNumber: customer.phoneNumber,
        address: {
          street: customer.address.street,
          number: customer.address.number,
          complement: customer.address.complement,
          reference: customer.address.reference,
          neighborhood: customer.address.neighborhood,
          city: customer.address.city,
        },
      },
      // restaurantId,
      restaurant: {
        connect: {
          id: restaurantId,
        },
      },
      items: [],
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
      customer: {
        name: customer.name,
        phoneNumber: customer.phoneNumber,
        address: {
          street: customer.address.street,
          number: customer.address.number,
          complement: customer.address.complement,
          reference: customer.address.reference,
          neighborhood: customer.address.neighborhood,
          city: customer.address.city,
        },
      },
      items: orderItems,
      status: order.status,
    }
  }
}
