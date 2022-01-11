import { AuthProvider } from '@/app/providers/AuthProvider/types'

class FakeAuthProvider implements AuthProvider {
  public generateToken(payload: string) {
    return payload
  }
}

export { FakeAuthProvider }
