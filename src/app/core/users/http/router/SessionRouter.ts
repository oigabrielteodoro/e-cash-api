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
import { AuthProviderInstance } from '@/app/providers/AuthProvider'

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
  verifyAuthentication(new AuthProviderInstance()),
  validParamsBySchema(logOutUserSchema),
  sessionsController.delete,
)

export { router as sessionsRouter }
