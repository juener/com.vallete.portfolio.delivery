import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users';
import { FindUserByEmailUseCase } from '../find-user-by-email';

export function makeFindUserByEmailUseCase() {
  const usersRepository = new PrismaUsersRepository();
    const useCase = new FindUserByEmailUseCase(usersRepository);

    return useCase;
}
