import { v4 as uuid } from 'uuid'
import {
  BankAccountsRepositoryProvider,
  BankAccountType,
} from '@/app/core/bank_accounts/types'

import { FakeBankAccountsRepository } from '.'

describe('BankAccountsRepository', () => {
  let bankAccountsRepository: BankAccountsRepositoryProvider

  beforeEach(() => {
    bankAccountsRepository = new FakeBankAccountsRepository()
  })

  it('should be able create new bank account', async () => {
    const user_id = uuid()
    const name = 'Main Account'
    const balance = '5000'
    const bank_flag = 'Nubank'
    const description = 'Main account for payment biils'
    const account_type = BankAccountType.CHECKING_ACCOUNT

    const bankAccount = await bankAccountsRepository.create({
      name,
      account_type,
      balance,
      bank_flag,
      description,
      user_id,
      include_sum_main_screen: true,
    })

    expect(bankAccount.user_id).toBe(user_id)
    expect(bankAccount.name).toBe(name)
    expect(bankAccount.account_type).toBe(account_type)
    expect(bankAccount.balance).toBe(balance)
    expect(bankAccount.bank_flag).toBe(bank_flag)
    expect(bankAccount.description).toBe(description)
    expect(bankAccount.include_sum_main_screen).toBeTruthy()
  })

  it('should be able return bank accounts by user_id', async () => {
    const user_id = uuid()
    const name = 'Main Account'
    const balance = '5000'
    const bank_flag = 'Nubank'
    const description = 'Main account for payment biils'
    const account_type = BankAccountType.CHECKING_ACCOUNT

    const bankAccount = await bankAccountsRepository.create({
      name,
      account_type,
      balance,
      bank_flag,
      description,
      user_id,
      include_sum_main_screen: true,
    })

    expect(bankAccount.user_id).toBe(user_id)
    expect(bankAccount.name).toBe(name)
    expect(bankAccount.account_type).toBe(account_type)
    expect(bankAccount.balance).toBe(balance)
    expect(bankAccount.bank_flag).toBe(bank_flag)
    expect(bankAccount.description).toBe(description)
    expect(bankAccount.include_sum_main_screen).toBeTruthy()

    const bankAccounts = await bankAccountsRepository.findAllByUserId(user_id)

    expect(bankAccounts).toEqual([bankAccount])
  })

  it('should be able return bank account by name and user_id', async () => {
    const user_id = uuid()
    const name = 'Main Account'
    const balance = '5000'
    const bank_flag = 'Nubank'
    const description = 'Main account for payment biils'
    const account_type = BankAccountType.CHECKING_ACCOUNT

    const bankAccount = await bankAccountsRepository.create({
      name,
      account_type,
      balance,
      bank_flag,
      description,
      user_id,
      include_sum_main_screen: true,
    })

    expect(bankAccount.user_id).toBe(user_id)
    expect(bankAccount.name).toBe(name)
    expect(bankAccount.account_type).toBe(account_type)
    expect(bankAccount.balance).toBe(balance)
    expect(bankAccount.bank_flag).toBe(bank_flag)
    expect(bankAccount.description).toBe(description)
    expect(bankAccount.include_sum_main_screen).toBeTruthy()

    const bankAccountById = await bankAccountsRepository.findByName(
      name,
      user_id,
    )

    expect(bankAccountById).toBe(bankAccount)
  })
})
