import { AppError } from '@/lib'

import { FakeUsersRepository } from '@/app/core/users/infra/repositories'
import { FakeCategoriesRepository } from '@/app/core/categories/infra/repositories'

import { UsersRepositoryProvider } from '@/app/core/users/types'
import { CategoriesRepositoryProvider } from '@/app/core/categories/types'

import { DeleteCategoryService } from './DeleteCategoryService'

describe('DeleteCategoryService', () => {
  let fakeUsersRepository: UsersRepositoryProvider
  let fakeCategoriesRepository: CategoriesRepositoryProvider
  let deleteCategoryService: DeleteCategoryService

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeCategoriesRepository = new FakeCategoriesRepository()
    deleteCategoryService = new DeleteCategoryService(
      fakeUsersRepository,
      fakeCategoriesRepository,
    )
  })

  it('should be able delete category successfully', async () => {
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

    await expect(
      deleteCategoryService.execute({
        user_id: user.id,
        category_id: category.id,
      }),
    ).resolves.toBeUndefined()

    const categories = await fakeCategoriesRepository.findAllByUserId(user.id)

    expect(categories).toEqual([])
  })

  it('should not be able delete category when user is invalid', async () => {
    await expect(
      deleteCategoryService.execute({
        user_id: 'wrong-user-id',
        category_id: 'wrong-category-id',
      }),
    ).rejects.toEqual(new AppError('user.invalid', 'Invalid user.', 404))
  })

  it('should not be able delete category when id is invalid', async () => {
    const user = await fakeUsersRepository.create({
      email: 'example@mail.com',
      full_name: 'Example',
      password: '@Strongpassword123',
    })
    await expect(
      deleteCategoryService.execute({
        user_id: user.id,
        category_id: 'wrong-category-id',
      }),
    ).rejects.toEqual(
      new AppError(
        'category.invalid',
        'Invalid category. You to have create new category.',
        404,
      ),
    )
  })
})
