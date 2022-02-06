import { AppError } from '@/lib'

import { FakeUsersRepository } from '@/app/core/users/infra/repositories'
import { FakeCategoriesRepository } from '@/app/core/categories/infra/repositories'

import { UsersRepositoryProvider } from '@/app/core/users/types'
import { CategoriesRepositoryProvider } from '@/app/core/categories/types'

import { ListCategoriesService } from './ListCategoriesService'

describe('ListCategoriesService', () => {
  let fakeUsersRepository: UsersRepositoryProvider
  let fakeCategoriesRepository: CategoriesRepositoryProvider
  let listCategoriesService: ListCategoriesService

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeCategoriesRepository = new FakeCategoriesRepository()
    listCategoriesService = new ListCategoriesService(
      fakeUsersRepository,
      fakeCategoriesRepository,
    )
  })

  it('should be able list categories successfully', async () => {
    const name = 'Education'
    const description = 'Bills for education'

    const user = await fakeUsersRepository.create({
      email: 'example@mail.com',
      full_name: 'Example',
      password: '@Strongpassword123',
    })

    const category = await fakeCategoriesRepository.create({
      user_id: user.id,
      name,
      description,
    })

    const categories = await listCategoriesService.execute(user.id)

    expect(categories).toEqual([category])
  })

  it('should not be able list categories when user is invalid', async () => {
    await expect(
      listCategoriesService.execute('wrong-user-id'),
    ).rejects.toEqual(new AppError('user.invalid', 'Invalid user.', 404))
  })
})
