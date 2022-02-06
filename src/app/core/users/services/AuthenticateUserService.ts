import { injectable, inject } from 'tsyringe'

import { AppError } from '@/lib/errors'
import {
  AuthenticateResponse,
  AuthenticateUser,
  SessionsRepositoryProvider,
  UsersRepositoryProvider,
} from '@/app/core/users/types'
import { HashProvider } from '@/app/providers/HashProvider/types'
import { AuthProvider } from '@/app/providers/AuthProvider/types'

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryProvider,

    @inject('SessionsRepository')
    private sessionsRepository: SessionsRepositoryProvider,

    @inject('HashProvider')
    private hashProvider: HashProvider,

    @inject('AuthProvider')
    private authProvider: AuthProvider,
  ) {}

  public async execute(data: AuthenticateUser): Promise<AuthenticateResponse> {
    const userByEmail = await this.usersRepository.findByEmail(data.email)

    if (!userByEmail) {
      throw new AppError(
        'user.credentials.invalid',
        'Invalid email/password.',
        401,
      )
    }

    const passwordIsMatch = await this.hashProvider.compareHash(
      data.password,
      userByEmail.password,
    )

    if (!passwordIsMatch) {
      throw new AppError(
        'user.credentials.invalid',
        'Invalid email/password.',
        401,
      )
    }

    const token = this.authProvider.generateToken(userByEmail.id)

    const { id: session_id } = await this.sessionsRepository.create(
      userByEmail.id,
    )

    delete userByEmail.password

    return {
      user_id: userByEmail.id,
      token,
      session_id,
    }
  }
}

export { AuthenticateUserService }
