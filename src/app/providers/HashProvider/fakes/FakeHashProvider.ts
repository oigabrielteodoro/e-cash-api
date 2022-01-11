import { HashProvider } from '@/app/providers/HashProvider/types'

class FakeHashProvider implements HashProvider {
  public async generateHash(stringToHash: string, _?: number): Promise<string> {
    return stringToHash
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed
  }
}

export { FakeHashProvider }
