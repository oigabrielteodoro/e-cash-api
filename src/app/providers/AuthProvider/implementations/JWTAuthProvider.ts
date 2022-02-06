import { sign, verify } from 'jsonwebtoken'

import { AppError } from '@/lib'
import { AuthProvider, TokenPayload } from '@/app/providers/AuthProvider/types'
class JWTAuthProvider implements AuthProvider {
  private JWT_SECRET = process.env.JWT_SECRET

  public generateToken(payload: string) {
    return sign({ id: payload }, this.JWT_SECRET, {
      subject: payload,
      expiresIn: '30m',
    })
  }

  public verifyToken(token: string): string {
    try {
      const { sub } = verify(token, this.JWT_SECRET) as TokenPayload

      return sub
    } catch {
      throw new AppError('token.expired', 'Invalid token.', 401)
    }
  }
}

export { JWTAuthProvider }
