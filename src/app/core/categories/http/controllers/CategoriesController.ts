import { container } from 'tsyringe'
import { Request, Response, NextFunction } from 'express'

import {
  CreateCategoryService,
  ListCategoriesService,
  DeleteCategoryService,
} from '@/app/core/categories/services'
import { toSnakeCaseWithObject } from '@/lib'

class CategoriesController {
  public async index(request: Request, response: Response, next: NextFunction) {
    const { user_id } = request

    const listCategories = container.resolve(ListCategoriesService)

    try {
      const categories = await listCategories.execute(user_id)

      return response.json(categories)
    } catch (error) {
      return next(error)
    }
  }

  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const user_id = request.user_id
    const body = toSnakeCaseWithObject(request.body)

    const createCategory = container.resolve(CreateCategoryService)

    try {
      const category = await createCategory.execute({
        user_id,
        ...body,
      })

      return response.json({ category })
    } catch (error) {
      return next(error)
    }
  }

  public async delete(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { user_id, params } = request
    const { category_id } = toSnakeCaseWithObject(params)

    const deleteCategory = container.resolve(DeleteCategoryService)

    try {
      await deleteCategory.execute({
        user_id,
        category_id,
      })

      return response.send()
    } catch (error) {
      return next(error)
    }
  }
}

export { CategoriesController }
