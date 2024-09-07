import { MaxDistanceError } from '@/use-cases/errors/max-distance';
import { makeCreateCheckInUseCase } from '@/use-cases/factories/make-create-check-in';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createCheckInController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCheckInBodySchema = z.object({
    gymId: z.string().min(36),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90; // a longitude can be only between -90 and +90
        }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180; // a longitude can be only between -180 and +180
        }),
  });

    const { gymId, latitude, longitude } = createCheckInBodySchema.parse(
    request.body,
  );

  const createCheckInUseCase = makeCreateCheckInUseCase();

    try {
    const { checkIn } = await createCheckInUseCase.execute({
      userId: request.user.sub,
      gymId,
      userLatitude: latitude,
      userLongitude: longitude,
    });

        return reply.status(200).send({
      checkIn,
    });
    } catch (err) {
    if (err instanceof MaxDistanceError) {
      return reply.status(400).send({ message: err.message });
        }

    return reply.status(500).send();
    }
}
