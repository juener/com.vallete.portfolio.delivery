import { FastifyReply, FastifyRequest } from 'fastify';

export function verifyUserRole(roleToBeVerified: 'ADMIN' | 'USER') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;

        if (role !== roleToBeVerified) {
      reply.status(401).send({ message: 'Not authorized.' });
        }
  };
}
