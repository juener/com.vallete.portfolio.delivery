import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { RestaurantsRepository } from '../restaurants-repository';

export class PrismaRestaurantsRepository implements RestaurantsRepository {
  async create(data: Prisma.RestaurantCreateInput) {
    const restaurant = await prisma.restaurant.create({
      data,
    });
        return restaurant;
    }
}
