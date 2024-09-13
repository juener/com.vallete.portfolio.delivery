import { RestaurantsRepository } from '@/repositories/restaurants-repository'

interface DeleteRestaurantUseCaseRequest {
  id: string
}

export class DeleteRestaurantUseCase {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute({ id }: DeleteRestaurantUseCaseRequest): Promise<void> {
    this.restaurantsRepository.delete(id)

    return
  }
}
