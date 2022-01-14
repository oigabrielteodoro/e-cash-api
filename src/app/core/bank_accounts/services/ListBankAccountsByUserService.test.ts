import { AppError } from '@/lib'

import { FakeUsersRepository } from '@/app/core/users/infra/repositories'
import { FakeBankAccountsRepository } from '@/app/core/bank_accounts/infra/repositories'

import { UsersRepositoryProvider } from '@/app/core/users/types'
import {
  BankAccountsRepositoryProvider,
  BankAccountType,
} from '@/app/core/bank_accounts/types'

import { ListBankAccountsByUserService } from '.'

describe('ListBankAccountsByUserService', () => {
  let fakeUsersRepository: UsersRepositoryProvider
  let fakeBankAccountsRepository: BankAccountsRepositoryProvider
  let listBankAccountsService: ListBankAccountsByUserService

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeBankAccountsRepository = new FakeBankAccountsRepository()
    listBankAccountsService = new ListBankAccountsByUserService(
      fakeUsersRepository,
      fakeBankAccountsRepository,
    )
  })

  it('should be able list bank accounts successfuly', async () => {
    const user = await fakeUsersRepository.create({
      email: 'example@mail.com',
      full_name: 'Example',
      password: '@Strongpassword123',
    })

    const bankAccount = await fakeBankAccountsRepository.create({
      name: 'Main Account',
      account_type: BankAccountType.CHECKING_ACCOUNT,
      balance: '5000',
      bank_flag: 'Nubank',
      include_sum_main_screen: true,
      user_id: user.id,
      description: 'Main account for payment bills',
    })

    const bankAccounts = await listBankAccountsService.execute(user.id)

    expect(bankAccounts).toEqual([bankAccount])
  })

  it('should not be able list bank accounts when user is invalid', async () => {
    await expect(
      listBankAccountsService.execute('wrong-user-id'),
    ).rejects.toEqual(new AppError('Invalid user. Please try again.', 404))
  })
})
