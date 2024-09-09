import { RestaurantsRepository } from '@/repositories/restaurants-repository'
import { Restaurant } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface UpdateRestaurantUseCaseRequest {
  id: string
  cnpj: string
  title: string
  managerId: string
  email: string
}

interface UpdateRestaurantUseCaseResponse {
  restaurant: Restaurant
}

export class UpdateRestaurantUseCase {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute({
    id,
    cnpj,
    title,
    managerId,
    email,
  }: UpdateRestaurantUseCaseRequest): Promise<UpdateRestaurantUseCaseResponse> {
    const restaurant = await this.restaurantsRepository.update({
      id,
      cnpj,
      title,
      manager: {
        connect: {
          id: managerId,
        },
      },
      email,
    })

    if (!restaurant) {
      throw new ResourceNotFoundError()
    }

    return {
      restaurant,
    }
  }
}
