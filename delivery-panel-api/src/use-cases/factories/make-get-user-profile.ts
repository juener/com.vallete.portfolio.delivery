import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users';
import { GetUserProfileUseCase } from '../get-user-profile';

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
    const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);

    return getUserProfileUseCase;
}
