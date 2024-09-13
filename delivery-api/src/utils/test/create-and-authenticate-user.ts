import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

const email = 'johndoe@vallete.com';
const password = '123456';

export async function createAndAuthenticateUserTest(
  app: FastifyInstance,
  isAdmin = false,
) {
  const passwordHash = await hash(password, 6);

    const { id: userId } = await prisma.user.create({
    data: {
      name: 'John Doe',
      email,
      passwordHash,
      role: isAdmin ? 'ADMIN' : 'USER',
    },
  });

    const authResponse = await request(app.server).post('/authenticate').send({
    email,
    password,
  });

    const { token } = authResponse.body;

    return {
    token,
    userId,
  };
}
