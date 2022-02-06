import { AppError } from '@/lib'

import { FakeUsersRepository } from '@/app/core/users/infra/repositories'
import { FakeBankAccountsRepository } from '@/app/core/bank_accounts/infra/repositories'

import { UsersRepositoryProvider } from '@/app/core/users/types'
import {
  BankAccountsRepositoryProvider,
  BankAccountType,
} from '@/app/core/bank_accounts/types'

import { CreateBankAccountService } from '.'

describe('CreateBankAccountService', () => {
  let fakeUsersRepository: UsersRepositoryProvider
  let fakeBankAccountsRepository: BankAccountsRepositoryProvider
  let createBankAccountService: CreateBankAccountService

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeBankAccountsRepository = new FakeBankAccountsRepository()
    createBankAccountService = new CreateBankAccountService(
      fakeUsersRepository,
      fakeBankAccountsRepository,
    )
  })

  it('should be able create bank account successfuly', async () => {
    const name = 'Main Account'
    const account_type = BankAccountType.CHECKING_ACCOUNT
    const balance = '5000'
    const bank_flag = 'Nubank'
    const description = 'Main account for payment biils'

    const user = await fakeUsersRepository.create({
      email: 'example@mail.com',
      full_name: 'Example',
      password: '@Strongpassword123',
    })

    const bankAccount = await createBankAccountService.execute({
      name,
      account_type,
      balance,
      bank_flag,
      include_sum_main_screen: true,
      user_id: user.id,
      description,
    })

    expect(bankAccount.user_id).toBe(user.id)
    expect(bankAccount.name).toBe(name)
    expect(bankAccount.account_type).toBe(account_type)
    expect(bankAccount.balance).toBe(balance)
    expect(bankAccount.bank_flag).toBe(bank_flag)
    expect(bankAccount.description).toBe(description)
    expect(bankAccount.include_sum_main_screen).toBeTruthy()
  })

  it('should not be able create bank account when balance is invalid', async () => {
    const name = 'Main Account'
    const account_type = BankAccountType.CHECKING_ACCOUNT
    const balance = 'wrong-balance'
    const bank_flag = 'Nubank'
    const description = 'Main account for payment biils'

    await expect(
      createBankAccountService.execute({
        name,
        account_type,
        balance,
        bank_flag,
        include_sum_main_screen: true,
        user_id: 'wrong-user-id',
        description,
      }),
    ).rejects.toEqual(
      new AppError(
        'bank_account.balance.invalid',
        'Invalid balance. Use only numbers',
        422,
      ),
    )
  })

  it('should not be able create bank account when user is invalid', async () => {
    const name = 'Main Account'
    const account_type = BankAccountType.CHECKING_ACCOUNT
    const balance = '5000'
    const bank_flag = 'Nubank'
    const description = 'Main account for payment biils'

    await expect(
      createBankAccountService.execute({
        name,
        account_type,
        balance,
        bank_flag,
        include_sum_main_screen: true,
        user_id: 'wrong-user-id',
        description,
      }),
    ).rejects.toEqual(new AppError('user.invalid', 'Invalid user.', 404))
  })

  it('should not be able create bank account when user already other bank account with name', async () => {
    const name = 'Main Account'
    const account_type = BankAccountType.CHECKING_ACCOUNT
    const balance = '5000'
    const bank_flag = 'Nubank'
    const description = 'Main account for payment biils'

    const user = await fakeUsersRepository.create({
      email: 'example@mail.com',
      full_name: 'Example',
      password: '@Strongpassword123',
    })

    await fakeBankAccountsRepository.create({
      name,
      account_type,
      balance,
      bank_flag,
      include_sum_main_screen: true,
      user_id: user.id,
      description,
    })

    await expect(
      createBankAccountService.execute({
        name,
        account_type,
        balance,
        bank_flag,
        include_sum_main_screen: true,
        user_id: user.id,
        description,
      }),
    ).rejects.toEqual(
      new AppError(
        'bank_account.name.in_use',
        'Already exists bank account with name!',
        409,
      ),
    )
  })
})
