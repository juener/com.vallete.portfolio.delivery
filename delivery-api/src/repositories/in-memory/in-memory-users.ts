import { Prisma, Role, User } from '@prisma/client';
import { UsersRepository } from '../users-repository';
import { randomUUID } from 'crypto';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

    async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      createdAt: new Date(),
      role: Role.USER,
    };

    this.items.push(user);

        return user;
    }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

        if (!user) {
      return null;
        }

    return user;
    }

  async findById(userId: string) {
    const user = this.items.find((item) => item.id === userId);

        if (!user) {
      return null;
        }

    return user;
    }
}
