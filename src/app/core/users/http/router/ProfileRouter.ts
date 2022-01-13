import { Router } from 'express'

import { UPDATE_USER_PROFILE } from '@/routes'
import { validBodyBySchema, validParamsBySchema } from '@/lib/schema'
import {
  updateUserProfileSchema,
  updateUserProfileParamsSchema,
} from '@/app/core/users/types'

import { ProfileController } from '@/app/core/users/http/controllers'

const router = Router()
const profileController = new ProfileController()

router.put(
  UPDATE_USER_PROFILE,
  validParamsBySchema(updateUserProfileParamsSchema),
  validBodyBySchema(updateUserProfileSchema),
  profileController.update,
)

export { router as profileRouter }
