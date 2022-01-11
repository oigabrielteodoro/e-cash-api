import { AppError } from '@/lib/errors'
import { FakeUsersRepository } from '@/app/core/users/infra/repositories'
import { FakeHashProvider } from '@/app/providers/HashProvider/fakes/FakeHashProvider'

import { CreateUserService } from './CreateUserService'

describe('CreateUserService', () => {
  let fakeUsersRepository: FakeUsersRepository
  let fakeHashProvider: FakeHashProvider
  let createUserService: CreateUserService

  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider()
    fakeUsersRepository = new FakeUsersRepository()
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    )
  })

  it('should be able create user successfully', async () => {
    const email = 'example@domoney.com'

    const user = await createUserService.execute({
      email,
      password: '123456',
    })

    expect(user.email).toBe(email)
  })

  it('should not be able create user when email already exists', async () => {
    const email = 'example@domoney.com'

    await fakeUsersRepository.create({
      email,
      password: '123456',
    })

    await expect(
      createUserService.execute({
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
