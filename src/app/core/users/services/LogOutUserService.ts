import { AppError } from '@/lib'
import { inject, injectable } from 'tsyringe'

import { SessionsRepositoryProvider, UsersRepositoryProvider } from '../types'

type Params = {
  user_id: string
  session_id: string
}

@injectable()
export class LogOutUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryProvider,

    @inject('SessionsRepository')
    private sessionsRepository: SessionsRepositoryProvider,
  ) {}

  public async execute({ user_id, session_id }: Params): Promise<void> {
    const sessionById = await this.sessionsRepository.findById(session_id)

    if (!sessionById) {
      throw new AppError('session.invalid', 'Invalid session.', 401)
    }

    const userById = await this.usersRepository.findById(user_id)

    if (!userById) {
      throw new AppError('user.invalid', 'Invalid user.', 404)
    }

    Object.assign(sessionById, {
      active: false,
    })

    await this.sessionsRepository.save(sessionById)
  }
}
