import { container } from 'tsyringe'

import { AccountsRepositoryProvider } from '@/app/core/accounts/types'
import { AccountsRepository } from '@/app/core/accounts/infra/repositories'

container.registerSingleton<AccountsRepositoryProvider>(
  'AccountsRepository',
  AccountsRepository,
)
