import { injectable, inject } from 'tsyringe'

import { AppError } from '@/lib'
import { UsersRepositoryProvider } from '@/app/core/users/types'
import {
  AccountsRepositoryProvider,
  DeleteAccount,
} from '@/app/core/accounts/types'

@injectable()
class DeleteAccountService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryProvider,

    @inject('AccountsRepository')
    private accountsRepository: AccountsRepositoryProvider,
  ) {}

  public async execute({ user_id, account_id }: DeleteAccount) {
    const userById = await this.usersRepository.findById(user_id)

    if (!userById) {
      throw new AppError('user.invalid', 'Invalid user.', 404)
    }

    const accountById = await this.accountsRepository.findBy({
      id: account_id,
    })

    if (!accountById) {
      throw new AppError('account.invalid', 'Invalid account.', 404)
    }

    if (accountById.user_id !== user_id) {
      throw new AppError(
        'accounts.user.invalid',
        "You don't have permission to delete this account.",
        401,
      )
    }

    return this.accountsRepository.delete(account_id)
  }
}

export { DeleteAccountService }
