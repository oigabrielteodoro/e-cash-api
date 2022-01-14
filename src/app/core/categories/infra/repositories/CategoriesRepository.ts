import { Repository, getRepository } from 'typeorm'

import { Category } from '@/app/core/categories/infra/entities'
import {
  FindCategoryByName,
  CategoriesRepositoryProvider,
  CreateCategory,
} from '@/app/core/categories/types'

class CategoriesRepository implements CategoriesRepositoryProvider {
  private ormRepository: Repository<Category>

  constructor() {
    this.ormRepository = getRepository(Category)
  }

  public async create(data: CreateCategory) {
    const category = this.ormRepository.create(data)

    await this.ormRepository.save(category)

    return category
  }

  public async findAllByUserId(user_id: string) {
    return this.ormRepository.find({
      where: {
        user_id,
      },
    })
  }

  public async findByName(options: FindCategoryByName) {
    return this.ormRepository.findOne({
      where: options,
    })
  }
}

export { CategoriesRepository }
