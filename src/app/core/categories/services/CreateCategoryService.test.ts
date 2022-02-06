import { AppError } from '@/lib'

import { FakeUsersRepository } from '@/app/core/users/infra/repositories/fakes'
import { FakeCategoriesRepository } from '@/app/core/categories/infra/repositories/fakes'

import { UsersRepositoryProvider } from '@/app/core/users/types'
import { CategoriesRepositoryProvider } from '@/app/core/categories/types'

import { CreateCategoryService } from './CreateCategoryService'

describe('CreateCategoryService', () => {
  let fakeUsersRepository: UsersRepositoryProvider
  let fakeCategoriesRepository: CategoriesRepositoryProvider
  let createCategoryService: CreateCategoryService

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeCategoriesRepository = new FakeCategoriesRepository()
    createCategoryService = new CreateCategoryService(
      fakeUsersRepository,
      fakeCategoriesRepository,
    )
  })

  it('should be able create category successfully', async () => {
    const name = 'Education'
    const description = 'Bills for education'

    const user = await fakeUsersRepository.create({
      email: 'example@mail.com',
      full_name: 'Example',
      password: '@Strongpassword123',
    })

    const category = await createCategoryService.execute({
      user_id: user.id,
      name,
      description,
    })

    expect(category.user_id).toBe(user.id)
    expect(category.name).toBe(name)
    expect(category.description).toBe(description)
  })

  it('should not be able create category when user is invalid', async () => {
    const name = 'Education'
    const description = 'Bills for education'

    await expect(
      createCategoryService.execute({
        user_id: 'wrong-user',
        name,
        description,
      }),
    ).rejects.toEqual(new AppError('user.invalid', 'Invalid user.', 404))
  })

  it('should not be able create category when user already exists category with name', async () => {
    const name = 'Education'
    const description = 'Bills for education'

    const user = await fakeUsersRepository.create({
      email: 'example@mail.com',
      full_name: 'Example',
      password: '@Strongpassword123',
    })

    await fakeCategoriesRepository.create({
      user_id: user.id,
      name,
      description,
    })

    await expect(
      createCategoryService.execute({
        user_id: user.id,
        name,
        description,
      }),
    ).rejects.toEqual(
      new AppError(
        'category.name.in_use',
        'Already exists category with name!',
        409,
      ),
    )
  })
})
