import { RestaurantsRepository } from '@/repositories/restaurants-repository'
import { Restaurant } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface GetRestaurantByIdRequest {
  id: string
  cnpj: string
  title: string
  managerId: string
  email: string
}

interface GetRestaurantByIdResponse {
  restaurant: Restaurant
}

export class GetRestaurantByIdUseCase {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute(id: string): Promise<GetRestaurantByIdResponse> {
    const restaurant = await this.restaurantsRepository.getRestaurantById(id)

    if (!restaurant) {
      throw new ResourceNotFoundError()
    }

    return {
      restaurant,
    }
  }
}
