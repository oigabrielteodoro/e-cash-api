import { Router } from 'express'

import { CREATE_SESSION, DELETE_SESSION, UPDATE_SESSION } from '@/routes'
import { validBodyBySchema, validParamsBySchema } from '@/lib/schema'
import { verifyAuthentication } from '@/app/interceptors'
import {
  authenticateUserSchema,
  logOutUserSchema,
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

router.delete(
  DELETE_SESSION,
  validParamsBySchema(logOutUserSchema),
  verifyAuthentication,
  sessionsController.delete,
)

export { router as sessionsRouter }
