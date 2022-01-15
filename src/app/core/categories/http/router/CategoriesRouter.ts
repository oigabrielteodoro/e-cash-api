import { Router } from 'express'

import { validBodyBySchema, validParamsBySchema } from '@/lib'
import { CREATE_CATEGORY, DELETE_CATEGORY, LIST_CATEGORIES } from '@/routes'
import { verifyAuthentication } from '@/app/interceptors'
import { AuthProviderInstance } from '@/app/providers/AuthProvider'

import { CategoriesController } from '@/app/core/categories/http/controllers'
import {
  createCategorySchema,
  deleteCategorySchema,
} from '@/app/core/categories/types'

const router = Router()
const categoriesController = new CategoriesController()

router.use(verifyAuthentication(new AuthProviderInstance()))

router.get(LIST_CATEGORIES, categoriesController.index)

router.post(
  CREATE_CATEGORY,
  validBodyBySchema(createCategorySchema),
  categoriesController.create,
)

router.delete(
  DELETE_CATEGORY,
  validParamsBySchema(deleteCategorySchema),
  categoriesController.delete,
)

export { router as categoriesRouter }
