import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (err: any) {
    reply
      .status(401)
      .send({ message: `Unauthorized. \n\n${err.message} \n\n${err}` })
  }
}
