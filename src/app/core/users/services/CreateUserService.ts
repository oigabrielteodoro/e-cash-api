import { injectable, inject } from 'tsyringe'

import { AppError } from '@/lib/errors'

import { User } from '@/app/core/users/infra/entities'
import { CreateUser, UsersRepositoryProvider } from '@/app/core/users/types'
import { HashProvider } from '@/app/providers/HashProvider/types'

type CreateUserResponse = Pick<User, 'id' | 'email'>

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryProvider,

    @inject('HashProvider')
    private hashProvider: HashProvider,
  ) {}

  public async execute(data: CreateUser): Promise<CreateUserResponse> {
    const isEmailBeenUsed = await this.usersRepository.findByEmail(data.email)

    if (isEmailBeenUsed) {
      throw new AppError(
        'user.email.in_use',
        'Another user already exists using this email',
        409,
      )
    }

    const passwordHashed = await this.hashProvider.generateHash(data.password)

    const { id, email } = await this.usersRepository.create({
      email: data.email,
      password: passwordHashed,
      full_name: data.full_name,
    })

    const user = { id, email }

    return user
  }
}

export { CreateUserService, CreateUserResponse }
