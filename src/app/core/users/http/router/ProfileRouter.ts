import { Router } from 'express'

import { SHOW_USER_PROFILE, UPDATE_USER_PROFILE } from '@/routes'
import { validBodyBySchema } from '@/lib/schema'

import { verifyAuthentication } from '@/app/interceptors'
import { ProfileController } from '@/app/core/users/http/controllers'

import { updateUserProfileSchema } from '@/app/core/users/types'
import { AuthProviderInstance } from '@/app/providers/AuthProvider'

const router = Router()
const profileController = new ProfileController()

router.use(verifyAuthentication(new AuthProviderInstance()))

router.get(SHOW_USER_PROFILE, profileController.show)

router.put(
  UPDATE_USER_PROFILE,
  validBodyBySchema(updateUserProfileSchema),
  profileController.update,
)

export { router as profileRouter }
