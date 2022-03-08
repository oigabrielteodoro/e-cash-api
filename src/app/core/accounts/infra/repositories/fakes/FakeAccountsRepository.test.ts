import { v4 as uuid } from 'uuid'
import { AccountsRepositoryProvider } from '@/app/core/accounts/types'

import { FakeAccountsRepository } from '.'

describe('AccountsRepository', () => {
  let fakeAccountsRepository: AccountsRepositoryProvider

  beforeEach(() => {
    fakeAccountsRepository = new FakeAccountsRepository()
  })

  it('should be able create new account', async () => {
    const user_id = uuid()
    const name = 'Main Account'
    const balance = '5000'
    const banking_institution_id = '240'
    const category = 'Money'
    const banking_agency = '0000'
    const banking_account = '0000001'

    const account = await fakeAccountsRepository.create({
      name,
      category,
      balance,
      banking_institution_id,
      banking_account,
      banking_agency,
      user_id,
      include_sum_on_dashboard: true,
    })

    expect(account.user_id).toBe(user_id)
    expect(account.name).toBe(name)
    expect(account.category).toBe(category)
    expect(account.balance).toBe(balance)
    expect(account.banking_institution_id).toBe(banking_institution_id)
    expect(account.banking_account).toBe(banking_account)
    expect(account.banking_agency).toBe(banking_agency)
    expect(account.include_sum_on_dashboard).toBeTruthy()
  })

  it('should be able return bank accounts by user_id', async () => {
    const user_id = uuid()
    const name = 'Main Account'
    const balance = '5000'
    const banking_institution_id = '240'
    const category = 'Money'
    const banking_agency = '0000'
    const banking_account = '0000001'

    const account = await fakeAccountsRepository.create({
      name,
      category,
      balance,
      banking_institution_id,
      banking_account,
      banking_agency,
      user_id,
      include_sum_on_dashboard: true,
    })

    expect(account.user_id).toBe(user_id)
    expect(account.name).toBe(name)
    expect(account.category).toBe(category)
    expect(account.balance).toBe(balance)
    expect(account.banking_institution_id).toBe(banking_institution_id)
    expect(account.banking_account).toBe(banking_account)
    expect(account.banking_agency).toBe(banking_agency)
    expect(account.include_sum_on_dashboard).toBeTruthy()

    const accounts = await fakeAccountsRepository.findAllByUserId(user_id)

    expect(accounts).toEqual([account])
  })

  it('should be able return bank account by name and user_id', async () => {
    const user_id = uuid()
    const name = 'Main Account'
    const balance = '5000'
    const banking_institution_id = '240'
    const category = 'Money'
    const banking_agency = '0000'
    const banking_account = '0000001'

    const account = await fakeAccountsRepository.create({
      name,
      category,
      balance,
      banking_institution_id,
      banking_account,
      banking_agency,
      user_id,
      include_sum_on_dashboard: true,
    })

    expect(account.user_id).toBe(user_id)
    expect(account.name).toBe(name)
    expect(account.category).toBe(category)
    expect(account.balance).toBe(balance)
    expect(account.banking_institution_id).toBe(banking_institution_id)
    expect(account.banking_account).toBe(banking_account)
    expect(account.banking_agency).toBe(banking_agency)
    expect(account.include_sum_on_dashboard).toBeTruthy()

    const accountById = await fakeAccountsRepository.findByName(name, user_id)

    expect(accountById).toBe(account)
  })
})
