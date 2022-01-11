import { hash, compare } from 'bcryptjs'

import { HashProvider } from '@/app/providers/HashProvider/types'

class BCryptHashProvider implements HashProvider {
  public async generateHash(stringToHash: string, count = 10): Promise<string> {
    const hashed = await hash(stringToHash, count)

    return hashed
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    const isEqual = await compare(payload, hashed)

    return isEqual
  }
}

export { BCryptHashProvider }
