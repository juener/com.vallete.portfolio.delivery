import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'

interface PatchUserUseCaseRequest {
  id: string
  name?: string
  email?: string
  password?: string
}

export class PatchUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    name,
    email,
    password,
  }: PatchUserUseCaseRequest): Promise<void> {
    const passwordHash = password ? await hash(password, 6) : undefined

    const userWithSameEmail = email
      ? await this.usersRepository.findByEmail(email)
      : undefined

    if (userWithSameEmail && userWithSameEmail.id !== id) {
      throw new UserAlreadyExistsError()
    }

    this.usersRepository.patch({ id, name, email, passwordHash })

    return
  }
}
