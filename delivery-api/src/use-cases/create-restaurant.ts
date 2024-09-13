import { Restaurant } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { RestaurantsRepository } from '@/repositories/restaurants-repository'

interface CreateRestaurantUseCaseRequest {
  cnpj: string
  title: string
  managerId: string
  email: string
}

interface CreateRestaurantUseCaseResponse {
  restaurant: Restaurant
}

export class CreateRestaurantUseCase {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute({
    cnpj,
    title,
    managerId,
    email,
  }: CreateRestaurantUseCaseRequest): Promise<CreateRestaurantUseCaseResponse> {
    const restaurant = await this.restaurantsRepository.create({
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
