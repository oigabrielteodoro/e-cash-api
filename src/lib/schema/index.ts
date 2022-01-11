import { ObjectShape } from 'yup/lib/object'
import { ObjectSchema, ValidationError } from 'yup'
import { NextFunction, Request, Response } from 'express'

import { AppError } from '@/lib/errors'

export const validBodyBySchema =
  <T extends ObjectShape>(schema: ObjectSchema<T>) =>
  async (request: Request, _: Response, next: NextFunction) => {
    try {
      await schema.validate(request.body)

      return next()
    } catch (error) {
      if (error instanceof ValidationError) {
        console.log(error)

        return next(new AppError(error.errors.join(';;;')))
      }

      return next(error)
    }
  }
