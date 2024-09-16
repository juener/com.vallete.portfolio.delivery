import { makeGetRestaurantByIdUseCase } from '@/use-cases/factories/make-get-restaurant-by-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getRestaurantById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getRestaurantByIdParam = z.object({
    id: z.string().length(36),
  })

  const { id } = getRestaurantByIdParam.parse(request.params)

  try {
    const getRestaurantByIdUseCase = makeGetRestaurantByIdUseCase()

    const restaurant = await getRestaurantByIdUseCase.execute(id)

    return reply.status(200).send(restaurant)
  } catch (err: any) {
    console.log(err)
    return reply.status(500).send({ message: err?.message })
  }
}
