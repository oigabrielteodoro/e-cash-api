import { Router } from 'express'

import { CREATE_USER } from '@/routes'
import { validBodyBySchema } from '@/lib/schema'
import { createUserSchema } from '@/app/core/users/types'

import { UsersController } from '@/app/core/users/http/controllers'

const router = Router()
const usersController = new UsersController()

router.post(
  CREATE_USER,
  validBodyBySchema(createUserSchema),
  usersController.create,
)

export { router as usersRouter }
