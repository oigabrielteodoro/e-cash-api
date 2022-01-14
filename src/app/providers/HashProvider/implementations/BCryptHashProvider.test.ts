import { HashProvider } from '@/app/providers/HashProvider/types'

import { BCryptHashProvider } from './BCryptHashProvider'

describe('BCryptHashProvider', () => {
  let hashProvider: HashProvider

  beforeEach(() => {
    hashProvider = new BCryptHashProvider()
  })

  it('should be able generate hash based on text and compare hash', async () => {
    const password = '@Strongpassword123'

    const hashedPassword = await hashProvider.generateHash(password)

    expect(hashedPassword).toBeTruthy()

    const isPasswordMatch = await hashProvider.compareHash(
      password,
      hashedPassword,
    )

    expect(isPasswordMatch).toBeTruthy()
  })
})
