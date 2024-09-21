import { Prisma, Order, OrderItems } from '@prisma/client'
import { OrdersRepository, OrdersWithChildren } from '../orders-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrdersRepository implements OrdersRepository {
  async getOrders(): Promise<OrdersWithChildren[]> {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
        restaurant: true,
        customer: {
          include: {
            address: true,
          },
        },
        _count: true,
      },
      where: {},
    })

    return orders as OrdersWithChildren[]
  }

  async post(data: OrdersWithChildren): Promise<Order> {
    console.log('1')
    const customer = await prisma.customer.upsert({
      where: {
        phoneNumber: data.customer.phoneNumber,
      },
      update: {},
      create: {
        name: data.customer.name,
        phoneNumber: data.customer.phoneNumber,
        address: data.customer.address
          ? {
              create: {
                street: data.customer.address.street,
                number: data.customer.address.number,
                complement: data.customer.address.complement,
                reference: data.customer.address.reference,
                neighborhood: data.customer.address.neighborhood,
                city: data.customer.address.city,
              },
            }
          : undefined,
      },
    })
    console.log(data)
    console.log('--------')

    const orderData: Prisma.OrderCreateInput = {
      ...data,
      customer: { connect: { phoneNumber: customer.phoneNumber } },
      items: {
        create: data.items.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          obs: item.obs,
        })),
      },
      restaurant: { connect: { id: data.restaurant.connect?.id } },
    }

    console.log(orderData)

    const order = data.id
      ? await prisma.order.update({
          data: orderData,
          where: {
            id: data.id,
          },
        })
      : await prisma.order.create({
          data: orderData,
        })

    return order
  }

  async addItemsToOrder(
    orderId: string,
    items: Prisma.OrderItemsCreateInput[],
  ): Promise<OrderItems[]> {
    console.log('5')

    await prisma.orderItems.createMany({
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
