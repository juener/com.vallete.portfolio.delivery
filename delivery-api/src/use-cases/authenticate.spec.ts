import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users';
import { describe, expect, it, beforeEach } from 'vitest';
import { AuthenticateUseCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
        sut = new AuthenticateUseCase(usersRepository);
    });

    it("should be able to authenticate", async () => {
    const name = 'John Doe';
    const email = 'johndoe@vallete.com';
    const password = '123456';

    await usersRepository.create({
      name,
      email,
      passwordHash: await hash(password, 6),
    });

        const { user } = await sut.execute({
      email,
      password,
    });

        await expect(user.id).toEqual(expect.any(String));
    });

    it("should not be able to authenticate with a non-existent user", async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@vallete.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it("should not be able to authenticate if the user uses wrong password", async () => {
    const name = 'John Doe';
    const email = 'johndoe@vallete.com';
    const password = '123456';

    await usersRepository.create({
      name,
      email,
      passwordHash: await hash(password, 6),
    });

        await expect(() =>
      sut.execute({
        email,
        password: 'anotherPassword',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});
