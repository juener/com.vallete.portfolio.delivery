import { makeNearbyGymsUseCase } from '@/use-cases/factories/make-nearby-gyms';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function nearbyGymsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const nearbyGymsBodySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90; // -90 and +90 is the range for latitude
        }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180; // -180 and +180 is the range for longitude
        }),
  });

    const { latitude, longitude } = nearbyGymsBodySchema.parse(request.query);

    const nearbyGymsUseCase = makeNearbyGymsUseCase();

    const { gyms } = await nearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

    return reply.status(200).send({
    gyms,
  });
}
