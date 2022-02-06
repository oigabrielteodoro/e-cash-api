import { injectable, inject } from 'tsyringe'

import { AppError } from '@/lib'
import { UsersRepositoryProvider } from '@/app/core/users/types'
import { BankAccountsRepositoryProvider } from '@/app/core/bank_accounts/types'

@injectable()
class ListBankAccountsByUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryProvider,

    @inject('BankAccountsRepository')
    private bankAccountsRepository: BankAccountsRepositoryProvider,
  ) {}

  public async execute(user_id: string) {
    const userById = await this.usersRepository.findById(user_id)

    if (!userById) {
      throw new AppError('user.invalid', 'Invalid user.', 404)
    }

    const bankAccounts = await this.bankAccountsRepository.findAllByUserId(
      user_id,
    )

    return bankAccounts
  }
}

export { ListBankAccountsByUserService }
