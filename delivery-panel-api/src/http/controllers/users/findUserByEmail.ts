import { makeFindUserByEmailUseCase } from '@/use-cases/factories/make-find-user-by-email';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function findUserByEmailController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findUserByEmaiSchema = z.object({
    email: z.string().email(),
  });

    const { email } = findUserByEmaiSchema.parse(request.query);

    try {
    const findUserByEmailUseCase = makeFindUserByEmailUseCase();
        const { user } = await findUserByEmailUseCase.execute({
      email,
    });

        if (!user) {
      return reply.status(404).send();
        }

    return reply.status(200).send({ user });
    } catch (err) {
    return reply.status(500).send();
    }
}
