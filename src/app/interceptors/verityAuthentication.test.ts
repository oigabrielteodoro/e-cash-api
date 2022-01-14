import { NextFunction, Request, Response } from 'express'

import { AppError } from '@/lib'
import { AuthProvider } from '@/app/providers/AuthProvider/types'
import { FakeAuthProvider } from '@/app/providers/AuthProvider/fakes/FakeAuthProvider'

import { verifyAuthentication } from '.'

describe('verityAuthentication', () => {
  let mockRequest: Partial<Request> = {}
  let mockResponse: Partial<Response>
  let fakeAuthProvider: AuthProvider

  const mockNextFunction = jest.fn()

  beforeEach(() => {
    fakeAuthProvider = new FakeAuthProvider()
  })

  it('return user_id when token is valid', () => {
    mockRequest = {
      headers: {
        authorization: 'Bearer token',
      },
    }

    verifyAuthentication(fakeAuthProvider)(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction as NextFunction,
    )

    expect(mockRequest.user_id).toBeTruthy()
  })

  it('return error when token is missing', async () => {
    mockRequest = {}

    await expect(
      new Promise((resolve) =>
        resolve(
          verifyAuthentication(fakeAuthProvider)(
            mockRequest as Request,
            mockResponse as Response,
            mockNextFunction as NextFunction,
          ),
        ),
      ),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('return error when token is invalid', async () => {
    mockRequest = {
      headers: {
        authorization: 'Bearer',
      },
    }

    await expect(
      new Promise((resolve) =>
        resolve(
          verifyAuthentication(fakeAuthProvider)(
            mockRequest as Request,
            mockResponse as Response,
            mockNextFunction as NextFunction,
          ),
        ),
      ),
    ).rejects.toBeInstanceOf(AppError)
  })
})
