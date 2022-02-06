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
    const full_name = 'Example'
    const email = 'example@domoney.com'
    const password = '123456'

    const user = await createUserService.execute({
      email,
      full_name,
      password,
    })

    expect(user.email).toBe(email)
  })

  it('should not be able create user when email already exists', async () => {
    const full_name = 'Example'
    const email = 'example@domoney.com'
    const password = '123456'

    await fakeUsersRepository.create({
      email,
      full_name,
      password,
    })

    await expect(
      createUserService.execute({
        email,
        full_name,
        password,
      }),
    ).rejects.toEqual(
      new AppError(
        'user.email.in_use',
        'Another user already exists using this email',
        409,
      ),
    )
  })
})
