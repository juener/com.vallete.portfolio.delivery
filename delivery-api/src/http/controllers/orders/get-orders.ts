import { makeGetOrdersUseCase } from '@/use-cases/factories/make-get-orders'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getOrders(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getOrdersUseCase = makeGetOrdersUseCase()

    const orders = await getOrdersUseCase.execute()

    return reply.status(200).send({
      orders,
    })
  } catch (error) {
    return reply.status(500).send({ message: error })
  }
}
