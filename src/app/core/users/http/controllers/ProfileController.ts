import { container } from 'tsyringe'
import { NextFunction, Request, Response } from 'express'

import { UpdateUserProfileService } from '@/app/core/users/services'

class ProfileController {
  public async update(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const user_id = request.user_id
    const { like_be_called, full_name, financial_objective } = request.body

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
