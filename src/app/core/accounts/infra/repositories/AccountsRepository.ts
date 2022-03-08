import { Repository, getRepository } from 'typeorm'

import { Account } from '@/app/core/accounts/infra/entities'
import {
  CreateAccount,
  AccountsRepositoryProvider,
} from '@/app/core/accounts/types'

class AccountsRepository implements AccountsRepositoryProvider {
  private ormRepository: Repository<Account>

  constructor() {
    this.ormRepository = getRepository(Account)
  }

  public async create(data: CreateAccount) {
    const account = this.ormRepository.create(data)

    await this.ormRepository.save(account)

    return account
  }

  public async findAllByUserId(user_id: string) {
    return this.ormRepository.find({
      where: {
        user_id,
      },
    })
  }

  public async findByName(name: string, user_id: string) {
    return this.ormRepository.findOne({
      where: {
        user_id,
        name,
      },
    })
  }
}

export { AccountsRepository }
