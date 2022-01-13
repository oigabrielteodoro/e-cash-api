import { injectable, inject } from 'tsyringe'

import { AppError, convertBodyFromUndefined } from '@/lib'
import { User } from '@/app/core/users/infra/entities'
import { UpdateUser, UsersRepositoryProvider } from '@/app/core/users/types'

@injectable()
class UpdateUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryProvider,
  ) {}

  public async execute(user_id: string, data: UpdateUser): Promise<User> {
    const userById = await this.usersRepository.findById(user_id, {
      relations: ['profile'],
    })

    if (!userById) {
      throw new AppError('Invalid user. Please try again', 404)
    }

    const convertedData = convertBodyFromUndefined(data)

    if (userById.profile) {
      Object.assign(userById.profile, convertedData)
    }

    await this.usersRepository.save(userById)

    return userById
  }
}

export { UpdateUserProfileService }
