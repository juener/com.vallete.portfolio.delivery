import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function profileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfileUseCase = makeGetUserProfileUseCase();

    const { user } = await getUserProfileUseCase.execute({
    userId: request.user.sub,
  });

    return reply.status(200).send({
    user: {
      ...user,
      passwordHash: undefined,
    },
  });
}
