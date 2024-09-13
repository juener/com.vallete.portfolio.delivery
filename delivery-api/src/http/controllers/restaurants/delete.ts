import { makeDeleteRestaurantUseCase } from '@/use-cases/factories/make-delete-restaurant'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteRestaurant(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteQuerySchema = z.object({
    id: z.string(),
  })

  const { id } = deleteQuerySchema.parse(request.query)
  try {
    const deleteRestauranteUseCase = makeDeleteRestaurantUseCase()

    await deleteRestauranteUseCase.execute({ id })

    return reply.status(200).send()
  } catch (error: any) {
    return reply.status(500).send({ message: error?.message })
  }
}
