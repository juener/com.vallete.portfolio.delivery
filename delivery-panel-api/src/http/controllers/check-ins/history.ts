import { makeHistoryCheckInsUseCase } from '@/use-cases/factories/make-history-check-ins';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function historyCheckInsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const historyCheckInsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

    const { page } = historyCheckInsQuerySchema.parse(request.query);

    const historyCheckInsUseCase = makeHistoryCheckInsUseCase();

    const { checkIns } = await historyCheckInsUseCase.execute({
    userId: request.user.sub,
    page,
  });

    return reply.status(200).send({
    checkIns,
  });
}
