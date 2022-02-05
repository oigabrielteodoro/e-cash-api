import { container } from 'tsyringe'
import { NextFunction, Request, Response } from 'express'

import {
  ShowUserService,
  UpdateUserProfileService,
} from '@/app/core/users/services'

class ProfileController {
  public async show(request: Request, response: Response, next: NextFunction) {
    const { user_id } = request

    const showUser = container.resolve(ShowUserService)

    try {
      const user = await showUser.execute(user_id)

      return response.json({ user })
    } catch (error) {
      return next(error)
    }
  }

  public async update(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { user_id, body } = request
    const { like_be_called, full_name, financial_objective } = body

    const updateUserProfile = container.resolve(UpdateUserProfileService)

    try {
      const user = await updateUserProfile.execute(user_id, {
        full_name,
        like_be_called,
        financial_objective,
      })

      return response.json({
        user,
      })
    } catch (error) {
      return next(error)
    }
  }
}

export { ProfileController }
