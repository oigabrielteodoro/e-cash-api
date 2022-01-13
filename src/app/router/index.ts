import { Router } from 'express'

import {
  usersRouter,
  sessionsRouter,
  profileRouter,
} from '@/app/core/users/http/router'

const router = Router()

router.use(usersRouter)
router.use(sessionsRouter)
router.use(profileRouter)

export { router }
