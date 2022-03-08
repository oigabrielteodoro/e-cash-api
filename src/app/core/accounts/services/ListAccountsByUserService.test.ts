import { AppError } from '@/lib'

import { FakeUsersRepository } from '@/app/core/users/infra/repositories'
import { FakeAccountsRepository } from '@/app/core/accounts/infra/repositories'
import { BankingInstitutionsRepository } from '@/app/core/banking_institutions/infra/repositories'

import { UsersRepositoryProvider } from '@/app/core/users/types'
import { AccountsRepositoryProvider } from '@/app/core/accounts/types'
import { BankingInstitutionsRepositoryProvider } from '@/app/core/banking_institutions/types'

import { ListAccountsByUserService } from '.'

describe('ListAccountsByUserService', () => {
  let fakeUsersRepository: UsersRepositoryProvider
  let fakeAccountsRepository: AccountsRepositoryProvider
  let listAccountsService: ListAccountsByUserService
  let bankingInstitutionsRepository: BankingInstitutionsRepositoryProvider

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeAccountsRepository = new FakeAccountsRepository()
    bankingInstitutionsRepository = new BankingInstitutionsRepository()
    listAccountsService = new ListAccountsByUserService(
      fakeUsersRepository,
      fakeAccountsRepository,
      bankingInstitutionsRepository,
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
      account_number: '0000001',
      agency_number: '0000',
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
