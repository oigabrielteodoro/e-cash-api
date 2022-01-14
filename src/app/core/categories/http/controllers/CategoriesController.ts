import { container } from 'tsyringe'
import { Request, Response, NextFunction } from 'express'

import { CreateCategoryService } from '@/app/core/categories/services/CreateCategoryService'

class CategoriesController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { user_id, body } = request

    const createCategory = container.resolve(CreateCategoryService)

    try {
      const category = await createCategory.execute({ user_id, ...body })

      return response.json({ category })
    } catch (error) {
      return next(error)
    }
  }
}

export { CategoriesController }
