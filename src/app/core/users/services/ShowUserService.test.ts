import { AppError } from '@/lib/errors'
import { FakeUsersRepository } from '@/app/core/users/infra/repositories'

import { ShowUserService } from './ShowUserService'

describe('ShowUserService', () => {
  let fakeUsersRepository: FakeUsersRepository
  let showUserService: ShowUserService

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    showUserService = new ShowUserService(fakeUsersRepository)
  })

  it('should be able return user with successfully', async () => {
    const full_name = 'Example'
    const email = 'example@domoney.com'
    const password = '123456'

    const { id: userId } = await fakeUsersRepository.create({
      full_name,
      email,
      password,
    })

    const user = await showUserService.execute(userId)

    expect(user.email).toBe(email)
    expect(user.full_name).toBe(full_name)
  })

  it('should not be able return user when user_id is invalid', async () => {
    await expect(showUserService.execute('wrong-user-id')).rejects.toEqual(
      new AppError('user.invalid', 'Invalid user.', 404),
    )
  })
})
