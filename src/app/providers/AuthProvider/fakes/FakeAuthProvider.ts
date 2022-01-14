import { v4 as uuid } from 'uuid'

import { AuthProvider } from '@/app/providers/AuthProvider/types'

class FakeAuthProvider implements AuthProvider {
  public generateToken(payload: string) {
    return payload
  }

  public verifyToken(_: string) {
    return uuid()
  }
}

export { FakeAuthProvider }
