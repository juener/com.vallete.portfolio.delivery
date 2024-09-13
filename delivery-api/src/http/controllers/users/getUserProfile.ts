import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getUserProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfileSchema = z.object({
    userId: z.string().length(36), // the UUID is always 36 characters length
  });

    const { userId } = getUserProfileSchema.parse(request.body);

    try {
    const getUserProfileUseCase = makeGetUserProfileUseCase();
        const user = await getUserProfileUseCase.execute({
      userId,
    });

        if (!user) {
      return reply.status(404).send();
        }

    return reply.status(200).send({ user });
    } catch (err) {
    return reply.status(500).send();
    }
}
