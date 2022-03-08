import { inject, injectable } from 'tsyringe'

import { BankingInstitutionsRepositoryProvider } from '../types'

@injectable()
class ListBankingInstitutionsService {
  constructor(
    @inject('BankingInstitutionsRepository')
    private bankingInstitutionsRepository: BankingInstitutionsRepositoryProvider,
  ) {}

  public execute() {
    return this.bankingInstitutionsRepository.findAll()
  }
}

export { ListBankingInstitutionsService }
