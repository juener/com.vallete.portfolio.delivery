import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym';
import { FastifyReply, FastifyRequest } from 'fastify';
import { string, z } from 'zod';

export async function createGymController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90; // a longitude can be only between -90 and +90
        }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180; // a longitude can be only between -180 and +180
        }),
  });

    const { title, description, phone, latitude, longitude } =
    createBodySchema.parse(request.body);

    const createGymUseCase = makeCreateGymUseCase();
    const { gym } = await createGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  });

    return reply.status(201).send({
    gym,
  });
}
