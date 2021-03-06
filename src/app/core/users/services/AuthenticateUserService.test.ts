import { AppError } from '@/lib/errors'
import {
  FakeUsersRepository,
  FakeSessionsRepository,
} from '@/app/core/users/infra/repositories'
import { FakeHashProvider } from '@/app/providers/HashProvider/fakes/FakeHashProvider'
import { FakeAuthProvider } from '@/app/providers/AuthProvider/fakes/FakeAuthProvider'

import { AuthenticateUserService } from './AuthenticateUserService'

describe('AuthenticateUserService', () => {
  let fakeUsersRepository: FakeUsersRepository
  let fakeSessionsRepository: FakeSessionsRepository
  let fakeHashProvider: FakeHashProvider
  let fakeAuthProvider: FakeAuthProvider
  let authenticateUserService: AuthenticateUserService

  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider()
    fakeUsersRepository = new FakeUsersRepository()
    fakeSessionsRepository = new FakeSessionsRepository()
    fakeAuthProvider = new FakeAuthProvider()
    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeSessionsRepository,
      fakeHashProvider,
      fakeAuthProvider,
    )
  })

  it('should be able authenticate user successfully', async () => {
    const full_name = 'Example'
    const email = 'example@domoney.com'
    const password = '123456'

    const data = {
      email,
      password,
      full_name,
    }

    const user = await fakeUsersRepository.create(data)

    const { token } = await authenticateUserService.execute(data)

    expect(token).toBe(user.id)
  })

  it('should not be able authenticate user when email/password is invalid', async () => {
    const full_name = 'Example'
    const email = 'example@domoney.com'
    const password = '123456'

    await fakeUsersRepository.create({
      email,
      password,
      full_name,
    })

    await expect(
      authenticateUserService.execute({
        email,
        password: 'wrong-password',
      }),
    ).rejects.toEqual(
      new AppError('user.credentials.invalid', 'Invalid email/password.', 401),
    )

    await expect(
      authenticateUserService.execute({
        email: 'wrong-email',
        password: 'wrong-password',
      }),
    ).rejects.toEqual(
      new AppError('user.credentials.invalid', 'Invalid email/password.', 401),
    )
  })
})
