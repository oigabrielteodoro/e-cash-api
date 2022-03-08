import { AppError } from '@/lib'

import { FakeUsersRepository } from '@/app/core/users/infra/repositories'
import { AccountsRepository } from '@/app/core/accounts/infra/repositories'

import { UsersRepositoryProvider } from '@/app/core/users/types'
import { AccountsRepositoryProvider } from '@/app/core/accounts/types'

import { CreateAccountService } from '.'

describe('CreateAccountService', () => {
  let fakeUsersRepository: UsersRepositoryProvider
  let fakeAccountsRepository: AccountsRepositoryProvider
  let createAccountService: CreateAccountService

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeAccountsRepository = new AccountsRepository()
    createAccountService = new CreateAccountService(
      fakeUsersRepository,
      fakeAccountsRepository,
    )
  })

  it('should be able create account successfuly', async () => {
    const name = 'Main Account'
    const balance = '5000'
    const banking_institution_id = '240'
    const category = 'Money'
    const banking_agency = '0000'
    const banking_account = '0000001'

    const user = await fakeUsersRepository.create({
      email: 'example@mail.com',
      full_name: 'Example',
      password: '@Strongpassword123',
    })

    const account = await createAccountService.execute({
      name,
      category,
      balance,
      banking_institution_id,
      banking_account,
      banking_agency,
      user_id: user.id,
      include_sum_on_dashboard: true,
    })

    expect(account.user_id).toBe(user.id)
    expect(account.name).toBe(name)
    expect(account.category).toBe(category)
    expect(account.balance).toBe(balance)
    expect(account.banking_institution_id).toBe(banking_institution_id)
    expect(account.banking_account).toBe(banking_account)
    expect(account.banking_agency).toBe(banking_agency)
    expect(account.include_sum_on_dashboard).toBeTruthy()
  })

  it('should not be able create account when balance is invalid', async () => {
    const name = 'Main Account'
    const banking_institution_id = '240'
    const category = 'Money'
    const banking_agency = '0000'
    const banking_account = '0000001'

    await expect(
      createAccountService.execute({
        name,
        category,
        balance: 'wrong-balance-id',
        banking_institution_id,
        banking_account,
        banking_agency,
        user_id: 'wrong-user-id',
        include_sum_on_dashboard: true,
      }),
    ).rejects.toEqual(
      new AppError(
        'account.balance.invalid',
        'Invalid balance. Use only numbers',
        422,
      ),
    )
  })

  it('should not be able create account when user is invalid', async () => {
    const name = 'Main Account'
    const balance = '5000'
    const banking_institution_id = '240'
    const category = 'Money'
    const banking_agency = '0000'
    const banking_account = '0000001'

    await expect(
      createAccountService.execute({
        name,
        category,
        balance,
        banking_institution_id,
        banking_account,
        banking_agency,
        user_id: 'wrong-user-id',
        include_sum_on_dashboard: true,
      }),
    ).rejects.toEqual(new AppError('user.invalid', 'Invalid user.', 404))
  })

  it('should not be able create bank account when user already other bank account with name', async () => {
    const name = 'Main Account'
    const balance = '5000'
    const banking_institution_id = '240'
    const category = 'Money'
    const banking_agency = '0000'
    const banking_account = '0000001'

    const user = await fakeUsersRepository.create({
      email: 'example@mail.com',
      full_name: 'Example',
      password: '@Strongpassword123',
    })

    await fakeAccountsRepository.create({
      name,
      category,
      balance,
      banking_institution_id,
      banking_account,
      banking_agency,
      user_id: user.id,
      include_sum_on_dashboard: true,
    })

    await expect(
      createAccountService.execute({
        name,
        category,
        balance,
        banking_institution_id,
        banking_account,
        banking_agency,
        user_id: user.id,
        include_sum_on_dashboard: true,
      }),
    ).rejects.toEqual(
      new AppError(
        'account.name.in_use',
        'Already exists bank account with name!',
        409,
      ),
    )
  })
})
