import { NextFunction, Request, Response } from 'express'

import { AppError } from '@/lib'
import { AuthProvider } from '@/app/providers/AuthProvider/types'

export const verifyAuthentication =
  (provider: AuthProvider) =>
  (request: Request, _: Response, next: NextFunction) => {
    const authorization = request.headers?.authorization

    if (!authorization) {
      throw new AppError('JWT token is missing', 404)
    }

    if (!authorization.includes(' ')) {
      throw new AppError('Invalid token. Please try again.', 401)
    }

    const [, token] = authorization.split(' ')

    const decoded = provider.verifyToken(token)

    request.user_id = decoded

    return next()
  }
