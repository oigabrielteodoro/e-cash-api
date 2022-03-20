import { AppError } from '@/lib'

import { FakeUsersRepository } from '@/app/core/users/infra/repositories'
import { FakeAccountsRepository } from '@/app/core/accounts/infra/repositories'

import { UsersRepositoryProvider } from '@/app/core/users/types'
import { AccountsRepositoryProvider } from '@/app/core/accounts/types'

import { DeleteAccountService } from '.'

describe('DeleteAccountService', () => {
  let fakeUsersRepository: UsersRepositoryProvider
  let fakeAccountsRepository: AccountsRepositoryProvider
  let deleteAccountService: DeleteAccountService

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeAccountsRepository = new FakeAccountsRepository()
    deleteAccountService = new DeleteAccountService(
      fakeUsersRepository,
      fakeAccountsRepository,
    )
  })

  it('should be able delete account successfuly', async () => {
    const name = 'Main Account'
    const balance = '5000'
    const banking_institution_id = '240'
    const category = 'Money'
    const agency_number = '0000'
    const account_number = '0000001'

    const user = await fakeUsersRepository.create({
      email: 'example@mail.com',
      full_name: 'Example',
      password: '@Strongpassword123',
    })

    const account = await fakeAccountsRepository.create({
      name,
      category,
      balance,
      banking_institution_id,
      account_number,
      agency_number,
      user_id: user.id,
      include_sum_on_dashboard: true,
    })

    await expect(
      deleteAccountService.execute({
        user_id: user.id,
        account_id: account.id,
      }),
    ).resolves.toBeUndefined()
  })

  it('should not be able delete account when user is invalid', async () => {
    await expect(
      deleteAccountService.execute({
        user_id: 'wrong-user',
        account_id: 'wrong-account',
      }),
    ).rejects.toEqual(new AppError('user.invalid', 'Invalid user.', 404))
  })

  it('should not be able delete bank account when account is invalid', async () => {
    const name = 'Main Account'
    const balance = '5000'
    const banking_institution_id = '240'
    const category = 'Money'
    const agency_number = '0000'
    const account_number = '0000001'

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
      account_number,
      agency_number,
      user_id: user.id,
      include_sum_on_dashboard: true,
    })

    await expect(
      deleteAccountService.execute({
        user_id: user.id,
        account_id: 'wrong-account',
      }),
    ).rejects.toEqual(new AppError('account.invalid', 'Invalid account.', 404))
  })

  it('should not be able delete bank account when user is different account owner', async () => {
    const name = 'Main Account'
    const balance = '5000'
    const banking_institution_id = '240'
    const category = 'Money'
    const agency_number = '0001'
    const account_number = '0000001'

    const user = await fakeUsersRepository.create({
      email: 'example@mail.com',
      full_name: 'Example',
      password: '@Strongpassword123',
    })

    const otherUser = await fakeUsersRepository.create({
      email: 'example@mail.com',
      full_name: 'Example',
      password: '@Strongpassword123',
    })

    const account = await fakeAccountsRepository.create({
      name,
      category,
      balance,
      banking_institution_id,
      account_number,
      agency_number,
      user_id: user.id,
      include_sum_on_dashboard: true,
    })

    await expect(
      deleteAccountService.execute({
        user_id: otherUser.id,
        account_id: account.id,
      }),
    ).rejects.toEqual(
      new AppError(
        'accounts.user.invalid',
        "You don't have permission to delete this account.",
        401,
      ),
    )
  })
})
