import { container } from 'tsyringe'
import { NextFunction, Request, Response } from 'express'

import { AuthenticateUserService } from '@/app/core/users/services'

class SessionsController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { email, password } = request.body

    const authenticateUser = container.resolve(AuthenticateUserService)

    try {
      const { token, user, session_id } = await authenticateUser.execute({
        email,
        password,
      })

      return response.json({
        user,
        token,
        session_id,
      })
    } catch (error) {
      return next(error)
    }
  }
}

export { SessionsController }
