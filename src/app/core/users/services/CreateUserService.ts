import { injectable, inject } from 'tsyringe'

import { AppError } from '@/lib/errors'

import { User } from '@/app/core/users/infra/entities'
import { CreateUser, UsersHandler } from '@/app/core/users/types'
import { HashProvider } from '@/app/providers/HashProvider/types'

type CreateUserResponse = Pick<User, 'id' | 'email'>

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersHandler,

    @inject('HashProvider')
    private hashProvider: HashProvider,
  ) {}

  public async execute(data: CreateUser): Promise<CreateUserResponse> {
    const isEmailBeenUsed = await this.usersRepository.findByEmail(data.email)

    if (isEmailBeenUsed) {
      throw new AppError('Another user already exists using this email', 409)
    }

    const passwordHashed = await this.hashProvider.generateHash(data.password)

    const { id, email } = await this.usersRepository.create({
      email: data.email,
      password: passwordHashed,
    })

    const user = { id, email }

    return user
  }
}

export { CreateUserService, CreateUserResponse }
