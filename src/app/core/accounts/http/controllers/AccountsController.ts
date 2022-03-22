import { container } from 'tsyringe'
import { NextFunction, Request, Response } from 'express'

import {
  CreateAccountService,
  DeleteAccountService,
  ListAccountsByUserService,
} from '@/app/core/accounts/services'
import { toSnakeCaseWithObject } from '@/lib'

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
    const user_id = request.user_id
    const body = toSnakeCaseWithObject(request.body)

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

  public async delete(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const user_id = request.user_id
    const { account_id } = toSnakeCaseWithObject(request.params)

    const deleteAccount = container.resolve(DeleteAccountService)

    try {
      await deleteAccount.execute({
        user_id,
        account_id,
      })

      return response.status(204).send()
    } catch (error) {
      return next(error)
    }
  }
}

export { AccountsController }
