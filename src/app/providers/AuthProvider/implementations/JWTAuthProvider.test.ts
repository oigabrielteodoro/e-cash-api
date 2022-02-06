import { v4 as uuid } from 'uuid'

import { AuthProvider } from '@/app/providers/AuthProvider/types'

import { JWTAuthProvider } from './JWTAuthProvider'
import { AppError } from '@/lib'

describe('JWTAuthProvider', () => {
  let authProvider: AuthProvider

  beforeEach(() => {
    authProvider = new JWTAuthProvider()
  })

  it('should be able generate token with user_id', () => {
    const user_id = uuid()

    const token = authProvider.generateToken(user_id)

    expect(token).toBeTruthy()
  })

  it('should be able generate token with user_id and verity token', () => {
    const user_id = uuid()

    const token = authProvider.generateToken(user_id)

    expect(token).toBeTruthy()

    const decoded = authProvider.verifyToken(token)

    expect(decoded).toBe(user_id)
  })

  it('should not be able valid token when token is invalid', async () => {
    await expect(
      new Promise((resolve) =>
        resolve(authProvider.verifyToken('wrong-token')),
      ),
    ).rejects.toEqual(new AppError('token.expired', 'Invalid token.', 401))
  })
})
