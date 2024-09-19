import { makePostOrderUseCase } from '@/use-cases/factories/make-post-order'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function postOrder(request: FastifyRequest, reply: FastifyReply) {
  const postOrdersItemsBodySchema = z.object({
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    obs: z.string().optional(),
  })

  const postOrdersBodySchema = z.object({
    id: z.string().optional(),
    restaurantId: z.string().length(36),
    items: z.array(postOrdersItemsBodySchema),
    status: z.enum([
      'PENDING',
      'WORKING',
      'READY_FOR_PICKUP',
      'ON_THE_WAY',
      'DELIVERED',
      'CANCELED',
    ]),
  })

  const { id, restaurantId, items, status } = postOrdersBodySchema.parse(
    request.body,
  )

  try {
    const postOrderUseCase = makePostOrderUseCase()

    await postOrderUseCase.execute({
      id,
      restaurantId,
      items,
      status,
    })

    return reply.status(201).send()
  } catch (error) {
    return reply.status(500).send({ message: error })
  }
}
