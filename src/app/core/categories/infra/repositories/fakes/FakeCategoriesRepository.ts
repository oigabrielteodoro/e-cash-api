import { v4 as uuid } from 'uuid'

import { Category } from '@/app/core/categories/infra/entities'
import {
  FindCategoryByName,
  CategoriesRepositoryProvider,
  CreateCategory,
  FindCategoryById,
} from '@/app/core/categories/types'

class FakeCategoriesRepository implements CategoriesRepositoryProvider {
  private categories: Category[]
  constructor() {
    this.categories = []
  }

  public async create(data: CreateCategory) {
    const category = new Category()

    Object.assign(category, {
      id: uuid(),
      created_at: new Date(),
      updated_at: new Date(),
      ...data,
    })

    this.categories.push(category)

    return category
  }

  public async findAllByUserId(user_id: string) {
    return this.categories.filter((category) => category.user_id === user_id)
  }

  public async findByName({ name, user_id }: FindCategoryByName) {
    const categoriesByUser = await this.findAllByUserId(user_id)

    return categoriesByUser.find((category) => category.name === name)
  }

  public async findById({ user_id, category_id }: FindCategoryById) {
    const categoriesByUser = await this.findAllByUserId(user_id)

    return categoriesByUser.find((category) => category.id === category_id)
  }

  public async deleteById(id: string) {
    this.categories = this.categories.filter((category) => category.id !== id)
  }
}

export { FakeCategoriesRepository }
