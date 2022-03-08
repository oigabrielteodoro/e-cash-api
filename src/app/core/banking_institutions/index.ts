import { container } from 'tsyringe'

import { BankingInstitutionsRepositoryProvider } from '@/app/core/banking_institutions/types'
import { BankingInstitutionsRepository } from '@/app/core/banking_institutions/infra/repositories'

container.registerSingleton<BankingInstitutionsRepositoryProvider>(
  'BankingInstitutionsRepository',
  BankingInstitutionsRepository,
)
