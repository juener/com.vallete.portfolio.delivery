import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function getUserMetricsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase();

    const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  });

    return reply.status(200).send({
    checkInsCount,
  });
}
