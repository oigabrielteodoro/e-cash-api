import { container } from 'tsyringe'
import { NextFunction, Request, Response } from 'express'

import {
  AuthenticateUserService,
  RenewSessionUserService,
} from '@/app/core/users/services'

export class SessionsController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { email, password } = request.body

    const authenticateUser = container.resolve(AuthenticateUserService)

    try {
      const { token, user_id, session_id } = await authenticateUser.execute({
        email,
        password,
      })

      return response.json({
        token,
        user_id,
        session_id,
      })
    } catch (error) {
      return next(error)
    }
  }

  public async update(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { user_id, session_id } = request.body

    const renewSessionUser = container.resolve(RenewSessionUserService)

    try {
      const { token } = await renewSessionUser.execute({
        user_id,
        session_id,
      })

      return response.json({
        token,
      })
    } catch (error) {
      return next(error)
    }
  }
}
