import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { hash } from 'bcryptjs';

interface CreateUserTestRequest {
  name: string;
  email: string;
  password: string;
}

export async function createUserTest({
  name,
  email,
  password,
}: CreateUserTestRequest) {
  const passwordHash = await hash(password, 6);

    const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });

    return { user };
}
