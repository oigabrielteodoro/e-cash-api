import { Router } from 'express'

import { validBodyBySchema } from '@/lib'
import { CREATE_CATEGORY, LIST_CATEGORIES } from '@/routes'
import { verifyAuthentication } from '@/app/interceptors'
import { AuthProviderInstance } from '@/app/providers/AuthProvider'

import { CategoriesController } from '@/app/core/categories/http/controllers'
import { createCategorySchema } from '@/app/core/categories/types'

const router = Router()
const categoriesController = new CategoriesController()

router.use(verifyAuthentication(new AuthProviderInstance()))

router.get(LIST_CATEGORIES, categoriesController.index)
router.post(
  CREATE_CATEGORY,
  validBodyBySchema(createCategorySchema),
  categoriesController.create,
)

export { router as categoriesRouter }
