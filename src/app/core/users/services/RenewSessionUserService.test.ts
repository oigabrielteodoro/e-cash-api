import { AppError } from '@/lib/errors'
import {
  FakeUsersRepository,
  FakeSessionsRepository,
} from '@/app/core/users/infra/repositories'
import { FakeAuthProvider } from '@/app/providers/AuthProvider/fakes/FakeAuthProvider'

import { RenewSessionUserService } from './RenewSessionUserService'

describe('RenewSessionUserService', () => {
  let fakeUsersRepository: FakeUsersRepository
  let fakeSessionsRepository: FakeSessionsRepository
  let fakeAuthProvider: FakeAuthProvider
  let renewSessionUser: RenewSessionUserService

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeSessionsRepository = new FakeSessionsRepository()
    fakeAuthProvider = new FakeAuthProvider()
    renewSessionUser = new RenewSessionUserService(
      fakeUsersRepository,
      fakeSessionsRepository,
      fakeAuthProvider,
    )
  })

  it('should be able renew session user successfully', async () => {
    const full_name = 'Example'
    const email = 'example@domoney.com'
    const password = '123456'

    const data = {
      email,
      password,
      full_name,
    }

    const { id: user_id } = await fakeUsersRepository.create(data)

    const { id: session_id } = await fakeSessionsRepository.create(user_id)

    const { token } = await renewSessionUser.execute({
      user_id,
      session_id,
    })

    expect(token).toBe(user_id)
  })

  it('should not be able renew session user when credentials is invalid', async () => {
    const full_name = 'Example'
    const email = 'example@domoney.com'
    const password = '123456'

    const firstUser = await fakeUsersRepository.create({
      email,
      password,
      full_name,
    })

    const { id: user_id } = await fakeUsersRepository.create({
      email,
      password,
      full_name,
    })

    await expect(
      renewSessionUser.execute({
        user_id,
        session_id: 'wrong-session-id',
      }),
    ).rejects.toEqual(new AppError('session.invalid', 'Invalid session.', 401))

    const { id: session_id } = await fakeSessionsRepository.create(firstUser.id)

    await expect(
      renewSessionUser.execute({
        user_id,
        session_id,
      }),
    ).rejects.toEqual(new AppError('session.invalid', 'Invalid session.', 401))
  })
})
