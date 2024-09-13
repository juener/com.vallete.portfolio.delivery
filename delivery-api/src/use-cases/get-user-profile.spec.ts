import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users';
import { GetUserProfileUseCase } from './get-user-profile';
import { ResourceNotFoundError } from './errors/resource-not-found';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
        sut = new GetUserProfileUseCase(usersRepository);
    });

    it("should get the user profile details", async () => {
    const userCreated = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@vallete.com',
      passwordHash: '123456',
    });

        const { user } = await sut.execute({
      userId: userCreated.id,
    });

        expect(user.email).toBe('johndoe@vallete.com');
  });

    it('should not be able to get the user profile details if the input is wrong', async () => {
    await expect(() =>
      sut.execute({
        userId: 'nonexistent-user-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
