import { container } from 'tsyringe'
import { NextFunction, Request, Response } from 'express'

import {
  CreateAccountService,
  ListAccountsByUserService,
} from '@/app/core/accounts/services'

class AccountsController {
  public async index(request: Request, response: Response, next: NextFunction) {
    const { user_id } = request

    const listAccounts = container.resolve(ListAccountsByUserService)

    try {
      const accounts = await listAccounts.execute(user_id)

      return response.json(accounts)
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

    const createAccount = container.resolve(CreateAccountService)

    try {
      const account = await createAccount.execute({
        user_id,
        ...body,
      })

      return response.json({
        account,
      })
    } catch (error) {
      return next(error)
    }
  }
}

export { AccountsController }
