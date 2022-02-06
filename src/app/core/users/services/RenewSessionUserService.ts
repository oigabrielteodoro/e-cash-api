import { inject, injectable } from 'tsyringe'

import { AppError } from '@/lib'
import { AuthProvider } from '@/app/providers/AuthProvider/types'

import { SessionsRepositoryProvider, UsersRepositoryProvider } from '../types'

type Params = {
  user_id: string
  session_id: string
}

type Response = {
  token: string
}

@injectable()
export class RenewSessionUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryProvider,

    @inject('SessionsRepository')
    private sessionsRepository: SessionsRepositoryProvider,

    @inject('AuthProvider')
    private authProvider: AuthProvider,
  ) {}

  public async execute({ user_id, session_id }: Params): Promise<Response> {
    const userById = await this.usersRepository.findById(user_id)

    if (!userById) {
      throw new AppError('user.invalid', 'Invalid user.', 404)
    }

    const sessionById = await this.sessionsRepository.findById(session_id)

    if (
      !sessionById ||
      !sessionById.active ||
      sessionById.user_id !== user_id
    ) {
      throw new AppError('session.invalid', 'Invalid session.', 401)
    }

    const token = this.authProvider.generateToken(user_id)

    return {
      token,
    }
  }
}
