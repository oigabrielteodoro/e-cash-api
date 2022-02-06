import { injectable, inject } from 'tsyringe'

import { AppError } from '@/lib'
import { UsersRepositoryProvider } from '@/app/core/users/types'
import {
  CategoriesRepositoryProvider,
  DeleteCategory,
} from '@/app/core/categories/types'

@injectable()
class DeleteCategoryService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryProvider,

    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepositoryProvider,
  ) {}

  public async execute({ user_id, category_id }: DeleteCategory) {
    const userById = await this.usersRepository.findById(user_id)

    if (!userById) {
      throw new AppError('user.invalid', 'Invalid user.', 404)
    }

    const category = await this.categoriesRepository.findById({
      user_id,
      category_id,
    })

    if (!category) {
      throw new AppError(
        'category.invalid',
        'Invalid category. You to have create new category.',
        404,
      )
    }

    await this.categoriesRepository.deleteById(category_id)
  }
}

export { DeleteCategoryService }
