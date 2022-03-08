import { injectable, inject } from 'tsyringe'

import { AppError } from '@/lib'
import { UsersRepositoryProvider } from '@/app/core/users/types'
import { AccountsRepositoryProvider } from '@/app/core/accounts/types'

@injectable()
class ListAccountsByUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryProvider,

    @inject('AccountsRepository')
    private accountsRepository: AccountsRepositoryProvider,
  ) {}

  public async execute(user_id: string) {
    const userById = await this.usersRepository.findById(user_id)

    if (!userById) {
      throw new AppError('user.invalid', 'Invalid user.', 404)
    }

    const accounts = await this.accountsRepository.findAllByUserId(user_id)

    return accounts
  }
}

export { ListAccountsByUserService }
