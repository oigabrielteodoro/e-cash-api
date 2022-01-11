import { Router } from 'express'

import { usersRouter, sessionsRouter } from '@/app/core/users/http/router'

const router = Router()

router.use(usersRouter)
router.use(sessionsRouter)

export { router }
