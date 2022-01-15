import { Joi } from 'celebrate'
import { Category } from '@/app/core/categories/infra/entities'

export type CreateCategory = Pick<Category, 'user_id' | 'name' | 'description'>
export type FindCategoryById = Pick<DeleteCategory, 'user_id' | 'category_id'>
export type FindCategoryByName = {
  name: string
  user_id: string
}

export type DeleteCategory = {
  user_id: string
  category_id: string
}

export type CategoriesRepositoryProvider = {
  create: (data: CreateCategory) => Promise<Category>
  findAllByUserId: (user_id: string) => Promise<Category[]>
  findByName: (options: FindCategoryByName) => Promise<Category | undefined>
  findById: (options: FindCategoryById) => Promise<Category | undefined>
  deleteById: (id: string) => Promise<void>
}

export const createCategorySchema = {
  name: Joi.string().required(),
  description: Joi.string().optional(),
}

export const deleteCategorySchema = {
  category_id: Joi.string().uuid().required(),
}
