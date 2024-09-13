import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials';
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
    const authenticateUseCase = makeAuthenticateUseCase();

        const { user } = await authenticateUseCase.execute({ email, password });

        const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    );

    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    );

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true, // not visible for front-ends
      })
      .setCookie('token', token, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send();
    } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: err.message });
        }

    return reply.status(500).send();
    }
}