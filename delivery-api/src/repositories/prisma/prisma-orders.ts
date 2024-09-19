import { Prisma, Order, OrderItems } from '@prisma/client'
import { OrdersRepository } from '../orders-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrdersRepository implements OrdersRepository {
  async getOrders(): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
      },
      where: {},
    })

    return orders
  }

  async post(data: Prisma.OrderCreateInput): Promise<Order> {
    let order: Order
    if (!data.id) {
      order = await prisma.order.create({
        data,
      })
    } else {
      order = await prisma.order.update({
        data,
        where: {
          id: data.id,
        },
      })
    }

    return order
  }

  async addItemsToOrder(
    orderId: string,
    items: Prisma.OrderItemsCreateInput[],
  ): Promise<OrderItems[]> {
    const orderItems = await prisma.orderItems.createMany({
      data: items.map((item) => ({
        ...item,
        orderId,
      })),
    })

    return prisma.orderItems.findMany({
      where: { orderId },
    })
  }
}
