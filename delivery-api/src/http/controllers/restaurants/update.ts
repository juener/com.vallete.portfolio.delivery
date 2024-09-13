import { makeUpdateRestaurantUseCase } from '@/use-cases/factories/make-update-restaurant'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateRestaurant(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateRestaurantBodySchema = z.object({
    id: z.string(),
    cnpj: z.string(),
    title: z.string(),
    managerId: z.string(),
    email: z.string().email(),
  })

  const { id, cnpj, title, managerId, email } =
    updateRestaurantBodySchema.parse(request.body)

  try {
    const updateRestaurantUseCase = makeUpdateRestaurantUseCase()

    await updateRestaurantUseCase.execute({
      id,
      cnpj,
      title,
      managerId,
      email,
    })

    return reply.status(200).send()
  } catch (error) {}
}
