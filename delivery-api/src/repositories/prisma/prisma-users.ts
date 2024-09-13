import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

interface PatchUserSchema {
  id: string
  name?: string
  email?: string
  passwordHash?: string
}

export class PrismaUsersRepository implements UsersRepository {
  async patch({
    id,
    name,
    email,
    passwordHash,
  }: PatchUserSchema): Promise<void> {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(passwordHash && { passwordHash }),
      },
    })
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findById(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    return user
  }
}
