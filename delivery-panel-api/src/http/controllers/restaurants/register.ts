import { makeCreateRestaurantUseCase } from '@/use-cases/factories/make-create-restaurant';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function registerRestaurant(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createBodySchema = z.object({
    cnpj: z.string(),
    title: z.string(),
    managerId: z.string(),
    email: z.string().email(),
  });

    const { cnpj, title, managerId, email } = createBodySchema.parse(
        request.body,
    );

    try {
    const createRestaurantUseCase = makeCreateRestaurantUseCase();

        await createRestaurantUseCase.execute({
      cnpj,
      title,
      managerId,
      email,
    });

        return reply.status(201).send();
    } catch (err: any) {
    console.log(err);
        return reply.status(500).send({ message: err?.message });
    }
}
