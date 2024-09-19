import { Order, OrderItems, Prisma } from '@prisma/client'

export interface OrdersRepository {
  getOrders(): Promise<Order[]>
  post(data: Prisma.OrderCreateInput): Promise<Order>
  addItemsToOrder(
    orderId: string,
    items: Prisma.OrderItemsCreateInput[],
  ): Promise<OrderItems[]>
}
