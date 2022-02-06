import { Router } from 'express'

import { CREATE_SESSION, UPDATE_SESSION } from '@/routes'
import { validBodyBySchema } from '@/lib/schema'
import {
  authenticateUserSchema,
  renewSessionUserSchema,
} from '@/app/core/users/types'

import { SessionsController } from '@/app/core/users/http/controllers'

const router = Router()
const sessionsController = new SessionsController()

router.post(
  CREATE_SESSION,
  validBodyBySchema(authenticateUserSchema),
  sessionsController.create,
)

router.put(
  UPDATE_SESSION,
  validBodyBySchema(renewSessionUserSchema),
  sessionsController.update,
)

export { router as sessionsRouter }
