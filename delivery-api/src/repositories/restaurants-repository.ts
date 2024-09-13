import { Prisma, Restaurant } from '@prisma/client'

export interface RestaurantsRepository {
  create(data: Prisma.RestaurantCreateInput): Promise<Restaurant>
  update(data: Prisma.RestaurantCreateInput): Promise<Restaurant>
  fetch(): Promise<Restaurant[]>
  delete(id: string): void
}