import { container } from 'tsyringe'
import { NextFunction, Request, Response } from 'express'

import {
  AuthenticateUserService,
  RenewSessionUserService,
  LogOutUserService,
} from '@/app/core/users/services'
import { toSnakeCaseWithObject } from '@/lib'

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
    const { user_id, session_id } = toSnakeCaseWithObject(request.body)

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

  public async delete(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const user_id = request.user_id
    const { session_id } = toSnakeCaseWithObject(request.params)

    const logOutUser = container.resolve(LogOutUserService)

    try {
      await logOutUser.execute({
        user_id,
        session_id,
      })

      return response.status(200).send()
    } catch (error) {
      return next(error)
    }
  }
}
