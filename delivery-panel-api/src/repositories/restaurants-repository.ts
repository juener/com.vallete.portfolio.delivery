import { Prisma, Restaurant } from '@prisma/client';

export interface RestaurantsRepository {
  create(data: Prisma.RestaurantCreateInput): Promise<Restaurant>;
}
