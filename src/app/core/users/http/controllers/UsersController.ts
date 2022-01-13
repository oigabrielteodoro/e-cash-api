import { container } from 'tsyringe'
import { NextFunction, Request, Response } from 'express'

import { CreateUserService } from '@/app/core/users/services'

class UsersController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { email, full_name, password } = request.body

    const createUser = container.resolve(CreateUserService)

    try {
      const user = await createUser.execute({
        email,
        password,
        full_name,
      })

      return response.json({
        user,
      })
    } catch (error) {
      return next(error)
    }
  }
}

export { UsersController }
