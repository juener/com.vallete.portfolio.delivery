import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function searchGymsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

    const { query, page } = searchQuerySchema.parse(request.query);

    const searchGymsUseCase = makeSearchGymsUseCase();

    const { gyms } = await searchGymsUseCase.execute({
    query,
    page,
  });

    return reply.status(200).send({
    gyms,
  });
}
