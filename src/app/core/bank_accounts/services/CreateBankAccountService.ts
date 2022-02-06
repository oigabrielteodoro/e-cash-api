import { injectable, inject } from 'tsyringe'

import { AppError, isValidNumber } from '@/lib'
import { UsersRepositoryProvider } from '@/app/core/users/types'
import {
  CreateBankAccount,
  BankAccountsRepositoryProvider,
} from '@/app/core/bank_accounts/types'

@injectable()
class CreateBankAccountService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryProvider,

    @inject('BankAccountsRepository')
    private bankAccountsRepository: BankAccountsRepositoryProvider,
  ) {}

  public async execute({ user_id, name, balance, ...rest }: CreateBankAccount) {
    if (!isValidNumber(balance)) {
      throw new AppError(
        'bank_account.balance.invalid',
        'Invalid balance. Use only numbers',
        422,
      )
    }

    const userById = await this.usersRepository.findById(user_id)

    if (!userById) {
      throw new AppError('user.invalid', 'Invalid user.', 404)
    }

    const bankAccountByName = await this.bankAccountsRepository.findByName(
      name,
      user_id,
    )

    if (bankAccountByName) {
      throw new AppError(
        'bank_account.name.in_use',
        'Already exists bank account with name!',
        409,
      )
    }

    const bankAccount = await this.bankAccountsRepository.create({
      user_id,
      name,
      balance,
      ...rest,
    })

    return bankAccount
  }
}

export { CreateBankAccountService }
