import { Account } from '@/app/core/accounts/infra/entities'
import {
  CreateAccount,
  AccountsRepositoryProvider,
} from '@/app/core/accounts/types'
import { isContains } from '@/lib/matcher'

class FakeAccountsRepository implements AccountsRepositoryProvider {
  private accounts: Account[]

  constructor() {
    this.accounts = []
  }

  public async create(data: CreateAccount) {
    const account = new Account()

    Object.assign(account, data)

    this.accounts.push(account)

    return account
  }

  public async findAllByUserId(user_id: string) {
    return this.accounts.filter((account) => account.user_id === user_id)
  }

  public async findByName(name: string, user_id: string) {
    const accountsByUserId = await this.findAllByUserId(user_id)

    return accountsByUserId.find((account) => account.name === name)
  }

  public async findBy(params: Partial<Account>) {
    return this.accounts.find((account) => isContains(account, params))
  }

  public async delete(account_id: string) {
    this.accounts = this.accounts.filter((account) => account.id !== account_id)
  }
}

export { FakeAccountsRepository }
