import { ObjectShape } from 'yup/lib/object'
import { ObjectSchema, ValidationError } from 'yup'
import { NextFunction, Request, Response } from 'express'

import { AppError } from '@/lib/errors'

export const validBySchema =
  <T extends ObjectShape>(
    schema: ObjectSchema<T>,
    requestKey: 'body' | 'params',
  ) =>
  async (request: Request, _: Response, next: NextFunction) => {
    try {
      await schema.validate(request[requestKey])

      return next()
    } catch (error) {
      if (error instanceof ValidationError) {
        console.log(error)

        return next(new AppError(error.errors.join(';;;')))
      }

      return next(error)
    }
  }

export const validBodyBySchema =
  <T extends ObjectShape>(schema: ObjectSchema<T>) =>
  async (request: Request, response: Response, next: NextFunction) =>
    validBySchema(schema, 'body')(request, response, next)

export const validParamsBySchema =
  <T extends ObjectShape>(schema: ObjectSchema<T>) =>
  async (request: Request, response: Response, next: NextFunction) =>
    validBySchema(schema, 'params')(request, response, next)
