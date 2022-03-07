import { NextFunction, Request, Response } from 'express'

import { ListBankingInstitutionsService } from '@/app/core/banking_institutions/services'

class BankingInstitutionsController {
  public index(_: Request, response: Response, next: NextFunction) {
    const listBankingInstitutions = new ListBankingInstitutionsService()

    try {
      const bankingInstitutions = listBankingInstitutions.execute()

      return response.json(bankingInstitutions)
    } catch (error) {
      return next(error)
    }
  }
}

export { BankingInstitutionsController }
