import { Request, Response, NextFunction } from 'express'

import { AppError } from '.'

export function getErrors(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
) {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      code: err.statusCode,
    })
  }

  console.log(err)

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    code: 500,
  })
}
