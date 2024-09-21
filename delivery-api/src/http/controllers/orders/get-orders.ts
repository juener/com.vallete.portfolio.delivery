import { makeGetOrdersUseCase } from '@/use-cases/factories/make-get-orders'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getOrders(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getOrdersUseCase = makeGetOrdersUseCase()

    const { orders } = await getOrdersUseCase.execute()

    const filteredOrders = orders.map((order) => ({
      ...order,
      restaurantId: undefined,
    }))

    return reply.status(200).send({
      orders: filteredOrders,
    })
  } catch (error) {
    return reply.status(500).send({ message: error })
  }
}
