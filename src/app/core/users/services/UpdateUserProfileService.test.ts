import { AppError, buildUser } from '@/lib'
import { FakeUsersRepository } from '@/app/core/users/infra/repositories'

import { UpdateUserProfileService } from './UpdateUserProfileService'

describe('UpdateUserProfileService', () => {
  let fakeUsersRepository: FakeUsersRepository
  let updateUserProfileService: UpdateUserProfileService

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    updateUserProfileService = new UpdateUserProfileService(fakeUsersRepository)
  })

  it('should be able update user-profile successfully', async () => {
    const full_name = 'John Doe'
    const financial_objective = 'Invest'
    const like_be_called = 'John'

    const { id } = await buildUser(fakeUsersRepository)

    const user = await updateUserProfileService.execute(id, {
      full_name,
      financial_objective,
      like_be_called,
    })

    expect(user.profile.full_name).toBe(full_name)
    expect(user.profile.like_be_called).toBe(like_be_called)
    expect(user.profile.financial_objective).toBe(financial_objective)
  })

  it('should not be able update user-profile when user is invalid', async () => {
    const full_name = 'John Doe'
    const financial_objective = 'Invest'
    const like_be_called = 'John'

    await expect(
      updateUserProfileService.execute('wrong-user-id', {
        full_name,
        financial_objective,
        like_be_called,
      }),
    ).rejects.toEqual(new AppError('user.invalid', 'Invalid user.', 404))
  })
})
