import { prisma } from '@/lib/prisma'
import { Prisma, Restaurant } from '@prisma/client'
import { RestaurantsRepository } from '../restaurants-repository'

export class PrismaRestaurantsRepository implements RestaurantsRepository {
  async delete(id: string): Promise<void> {
    await prisma.restaurant.delete({
      where: {
        id,
      },
    })
  }
  async fetch(): Promise<Restaurant[]> {
    const restaurants = await prisma.restaurant.findMany()

    return restaurants
  }

  async update(data: Prisma.RestaurantCreateInput): Promise<Restaurant> {
    const restaurant = await prisma.restaurant.update({
      where: {
        id: data.id,
      },
      data,
    })

    return restaurant
  }

  async create(data: Prisma.RestaurantCreateInput) {
    const restaurant = await prisma.restaurant.create({
      data,
    })

    return restaurant
  }
}
