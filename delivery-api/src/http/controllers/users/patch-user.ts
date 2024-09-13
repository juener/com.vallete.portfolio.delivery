import { makePatchUserUseCase } from '@/use-cases/factories/make-patch-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function patchUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const patchUserBodySchema = z.object({
    id: z.string().length(36),
    name: z.string().min(3).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
  })

  const { id, name, email, password } = patchUserBodySchema.parse(request.body)

  try {
    const patchUserUseCase = makePatchUserUseCase()

    await patchUserUseCase.execute({
      id,
      name,
      email,
      password,
    })

    return reply.status(200).send()
  } catch (error: any) {
    console.log(error)
    return reply.status(500).send({ message: error?.message })
  }
}
