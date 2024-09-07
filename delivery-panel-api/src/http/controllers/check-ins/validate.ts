import { MaxTimeExceeded } from '@/use-cases/errors/max-time-exceeded';
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function validateCheckInController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().min(36),
  });

    const { checkInId } = validateCheckInParamsSchema.parse(request.params);

    try {
    const validateCheckInUseCase = makeValidateCheckInUseCase();

        const { checkIn } = await validateCheckInUseCase.execute({ checkInId });

        return reply.status(200).send({
      checkIn,
    });
    } catch (err) {
    if (err instanceof MaxTimeExceeded) {
      return reply.status(400).send({ message: err.message });
        }

    reply.status(500).send();
    }
}
