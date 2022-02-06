import { injectable, inject } from 'tsyringe'

import { AppError } from '@/lib'
import { UsersRepositoryProvider } from '@/app/core/users/types'
import { CategoriesRepositoryProvider } from '@/app/core/categories/types'

@injectable()
class ListCategoriesService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryProvider,

    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepositoryProvider,
  ) {}

  public async execute(user_id: string) {
    const userById = await this.usersRepository.findById(user_id)

    if (!userById) {
      throw new AppError('user.invalid', 'Invalid user.', 404)
    }

    const categories = await this.categoriesRepository.findAllByUserId(user_id)

    return categories
  }
}

export { ListCategoriesService }
