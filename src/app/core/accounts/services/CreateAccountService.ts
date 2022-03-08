import { injectable, inject } from 'tsyringe'

import { AppError, isValidNumber } from '@/lib'
import { UsersRepositoryProvider } from '@/app/core/users/types'
import {
  CreateAccount,
  AccountsRepositoryProvider,
} from '@/app/core/accounts/types'

@injectable()
class CreateAccountService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryProvider,

    @inject('AccountsRepository')
    private accountsRepository: AccountsRepositoryProvider,
  ) {}

  public async execute({
    user_id,
    name,
    balance,
    agency_number,
    account_number,
    ...rest
  }: CreateAccount) {
    console.log(user_id)

    if (!isValidNumber(balance)) {
      throw new AppError(
        'account.balance.invalid',
        'Invalid balance. Use only numbers',
        422,
      )
    }

    const userById = await this.usersRepository.findById(user_id)

    if (!userById) {
      throw new AppError('user.invalid', 'Invalid user.', 404)
    }

    const alreadyExistsAccountWithName =
      await this.accountsRepository.findByName(name, user_id)

    if (alreadyExistsAccountWithName) {
      throw new AppError(
        'account.name.in_use',
        'Already exists bank account with name!',
        409,
      )
    }

    const alreadyExistsAccountWithAgency = await this.accountsRepository.findBy(
      {
        user_id,
        agency_number,
      },
    )

    if (alreadyExistsAccountWithAgency) {
      throw new AppError(
        'account.name.in_use',
        'Already exists bank account with agency!',
        409,
      )
    }

    const alreadyExistsAccountWithAccount =
      await this.accountsRepository.findBy({
        user_id,
        account_number,
      })

    if (alreadyExistsAccountWithAccount) {
      throw new AppError(
        'account.name.in_use',
        'Already exists bank account with account!',
        409,
      )
    }

    const account = await this.accountsRepository.create({
      user_id,
      name,
      balance,
      agency_number,
      account_number,
      ...rest,
    })

    return account
  }
}

export { CreateAccountService }
