import { container } from 'tsyringe'

import { BankAccountsRepositoryProvider } from '@/app/core/bank_accounts/types'
import { BankAccountsRepository } from '@/app/core/bank_accounts/infra/repositories'

container.registerSingleton<BankAccountsRepositoryProvider>(
  'BankAccountsRepository',
  BankAccountsRepository,
)
