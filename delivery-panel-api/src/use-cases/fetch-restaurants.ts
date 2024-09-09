import { RestaurantsRepository } from '@/repositories/restaurants-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { User } from '@prisma/client'

interface FetchRestaurantsUseCaseResponse {
  restaurants: Restaurant[]
}

interface Restaurant {
  id: string
  cnpj: string
  title: string
  userId: any
  email: string
}

export class FetchRestaurantsUseCase {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute(): Promise<FetchRestaurantsUseCaseResponse> {
    const restaurants = await this.restaurantsRepository.fetch()

    if (!restaurants) {
      throw new ResourceNotFoundError()
    }

    return {
      restaurants,
    }
  }
}
