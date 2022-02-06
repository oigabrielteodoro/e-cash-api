import { injectable, inject } from 'tsyringe'

import { AppError } from '@/lib/errors'

import { UsersRepositoryProvider } from '@/app/core/users/types'

type ShowUserResponse = {
  email: string
  full_name: string
  like_be_called: string
  avatar_url?: string
}

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryProvider,
  ) {}

  public async execute(user_id: string): Promise<ShowUserResponse> {
    const userById = await this.usersRepository.findById(user_id, {
      relations: ['profile'],
    })

    if (!userById) {
      throw new AppError('user.invalid', 'Invalid user.', 404)
    }

    return {
      full_name: userById.profile.full_name,
      email: userById.email,
      like_be_called: userById.profile.like_be_called,
      avatar_url: userById.profile.avatar_url,
    }
  }
}

export { ShowUserService }
