import { Repository, getRepository } from 'typeorm'

import { BankAccount } from '@/app/core/bank_accounts/infra/entities'
import {
  CreateBankAccount,
  BankAccountsRepositoryProvider,
} from '@/app/core/bank_accounts/types'

class BankAccountsRepository implements BankAccountsRepositoryProvider {
  private ormRepository: Repository<BankAccount>

  constructor() {
    this.ormRepository = getRepository(BankAccount)
  }

  public async create(data: CreateBankAccount) {
    const bankAccount = this.ormRepository.create(data)

    await this.ormRepository.save(bankAccount)

    return bankAccount
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

export { BankAccountsRepository }
