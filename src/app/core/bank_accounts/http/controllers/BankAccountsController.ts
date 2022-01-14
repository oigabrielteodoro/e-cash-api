import { container } from 'tsyringe'
import { NextFunction, Request, Response } from 'express'

import {
  CreateBankAccountService,
  ListBankAccountsByUserService,
} from '@/app/core/bank_accounts/services'

class BankAccountsController {
  public async index(request: Request, response: Response, next: NextFunction) {
    const { user_id } = request

    const listBankAccounts = container.resolve(ListBankAccountsByUserService)

    try {
      const bankAccounts = await listBankAccounts.execute(user_id)

      return response.json(bankAccounts)
    } catch (error) {
      return next(error)
    }
  }

  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { user_id, body } = request

    const createBankAccount = container.resolve(CreateBankAccountService)

    try {
      const bankAccount = await createBankAccount.execute({
        user_id,
        ...body,
      })

      return response.json({
        bank_account: bankAccount,
      })
    } catch (error) {
      return next(error)
    }
  }
}

export { BankAccountsController }
