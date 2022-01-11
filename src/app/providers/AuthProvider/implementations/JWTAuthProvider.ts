import { sign } from 'jsonwebtoken'
import { AuthProvider } from '@/app/providers/AuthProvider/types'

class JWTAuthProvider implements AuthProvider {
  public generateToken(payload: string) {
    return sign({ id: payload }, process.env.JWT_SECRET, {
      subject: payload,
      expiresIn: '1d',
    })
  }
}

export { JWTAuthProvider }
