import { Category } from '@/app/core/categories/infra/entities'

export type CreateCategory = Pick<Category, 'user_id' | 'name' | 'description'>
export type FindCategoryByName = {
  name: string
  user_id: string
}

export type CategoriesRepositoryProvider = {
  create: (data: CreateCategory) => Promise<Category>
  findAllByUserId: (user_id: string) => Promise<Category[]>
  findByName: (options: FindCategoryByName) => Promise<Category | undefined>
}
