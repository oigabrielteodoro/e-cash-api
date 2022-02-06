import { injectable, inject } from 'tsyringe'

import { AppError } from '@/lib'
import {
  CategoriesRepositoryProvider,
  CreateCategory,
} from '@/app/core/categories/types'
import { UsersRepositoryProvider } from '@/app/core/users/types'

@injectable()
class CreateCategoryService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryProvider,

    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepositoryProvider,
  ) {}

  public async execute({ user_id, name, description }: CreateCategory) {
    const userById = await this.usersRepository.findById(user_id)

    if (!userById) {
      throw new AppError('user.invalid', 'Invalid user.', 404)
    }

    const categoryByName = await this.categoriesRepository.findByName({
      user_id,
      name,
    })

    if (categoryByName) {
      throw new AppError(
        'category.name.in_use',
        'Already exists category with name!',
        409,
      )
    }

    const category = await this.categoriesRepository.create({
      user_id,
      name,
      description,
    })

    return category
  }
}

export { CreateCategoryService }
