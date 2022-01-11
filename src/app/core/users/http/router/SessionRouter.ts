import { Router } from 'express'

import { CREATE_SESSION } from '@/routes'
import { validBodyBySchema } from '@/lib/schema'
import { authenticateUserSchema } from '@/app/core/users/types'

import { SessionsController } from '@/app/core/users/http/controllers'

const router = Router()
const sessionsController = new SessionsController()

router.post(
  CREATE_SESSION,
  validBodyBySchema(authenticateUserSchema),
  sessionsController.create,
)

export { router as sessionsRouter }
