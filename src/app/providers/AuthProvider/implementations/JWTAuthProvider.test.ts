import { v4 as uuid } from 'uuid'

import { AuthProvider } from '@/app/providers/AuthProvider/types'

import { JWTAuthProvider } from './JWTAuthProvider'

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
})
