import { Order, OrderItems, Prisma } from '@prisma/client'

export type OrdersWithChildren = Prisma.OrderCreateInput & {
  items: OrderItems[]
  restaurantId?: string // use as optional, since this type is for get and post
  customer: {
    name: string
    phoneNumber: string
    address: Prisma.AddressCreateInput
  }
}

export interface OrdersRepository {
  getOrders(): Promise<OrdersWithChildren[]>
  post(data: OrdersWithChildren): Promise<Order>
  addItemsToOrder(
    orderId: string,
    items: Prisma.OrderItemsCreateInput[],
  ): Promise<OrderItems[]>
}
