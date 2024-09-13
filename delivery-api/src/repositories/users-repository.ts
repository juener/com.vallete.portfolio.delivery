import { Prisma, User } from '@prisma/client'

interface PatchUserSchema {
  id: string
  name?: string
  email?: string
  passwordHash?: string
}

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findById(userId: string): Promise<User | null>
  patch(data: PatchUserSchema): void
}
