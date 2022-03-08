import { AppError } from '@/lib'

import { FakeUsersRepository } from '@/app/core/users/infra/repositories'
import { FakeAccountsRepository } from '@/app/core/accounts/infra/repositories'

import { UsersRepositoryProvider } from '@/app/core/users/types'
import { AccountsRepositoryProvider } from '@/app/core/accounts/types'

import { ListAccountsByUserService } from '.'

describe('ListAccountsByUserService', () => {
  let fakeUsersRepository: UsersRepositoryProvider
  let fakeAccountsRepository: AccountsRepositoryProvider
  let listAccountsService: ListAccountsByUserService

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeAccountsRepository = new FakeAccountsRepository()
    listAccountsService = new ListAccountsByUserService(
      fakeUsersRepository,
      fakeAccountsRepository,
    )
  })

  it('should be able list accounts successfuly', async () => {
    const user = await fakeUsersRepository.create({
      email: 'example@mail.com',
      full_name: 'Example',
      password: '@Strongpassword123',
    })

    const account = await fakeAccountsRepository.create({
      name: 'Personal account',
      category: 'Money',
      balance: 'wrong-balance-id',
      banking_institution_id: '240',
      banking_account: '0000001',
      banking_agency: '0000',
      user_id: user.id,
      include_sum_on_dashboard: true,
    })

    const accounts = await listAccountsService.execute(user.id)

    expect(accounts).toEqual([account])
  })

  it('should not be able list accounts when user is invalid', async () => {
    await expect(listAccountsService.execute('wrong-user-id')).rejects.toEqual(
      new AppError('user.invalid', 'Invalid user.', 404),
    )
  })
})
