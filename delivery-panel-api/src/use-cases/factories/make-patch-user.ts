import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users'
import { PatchUserUseCase } from '../patch-user'

export function makePatchUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const patchUserUseCase = new PatchUserUseCase(usersRepository)

  return patchUserUseCase
}
