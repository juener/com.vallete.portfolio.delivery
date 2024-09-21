import { makePostOrderUseCase } from '@/use-cases/factories/make-post-order'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function postOrder(request: FastifyRequest, reply: FastifyReply) {
  const postOrderCustomerAddressBodySchema = z.object({
    street: z.string(),
    number: z.string(),
    complement: z.string().optional(),
    reference: z.string().optional(),
    neighborhood: z.string(),
    city: z.string().optional(),
  })

  const postOrderCustomerBodySchema = z.object({
    name: z.string(),
    phoneNumber: z.string(),
    address: postOrderCustomerAddressBodySchema,
  })

  const postOrderItemsBodySchema = z.object({
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    obs: z.string().optional(),
  })

  const postOrderBodySchema = z.object({
    id: z.string().optional(),
    restaurantId: z.string().length(36),
    customer: postOrderCustomerBodySchema,
    items: z.array(postOrderItemsBodySchema),
    status: z.enum([
      'PENDING',
      'WORKING',
      'READY_FOR_PICKUP',
      'ON_THE_WAY',
      'DELIVERED',
      'CANCELED',
    ]),
  })

  const { id, restaurantId, customer, items, status } =
    postOrderBodySchema.parse(request.body)

  try {
    const postOrderUseCase = makePostOrderUseCase()

    await postOrderUseCase.execute({
      id,
      restaurantId,
      customer,
      items,
      status,
    })

    return reply.status(201).send()
  } catch (error) {
    return reply.status(500).send({ message: error })
  }
}
