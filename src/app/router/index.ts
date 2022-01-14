import { Router } from 'express'

import {
  usersRouter,
  sessionsRouter,
  profileRouter,
} from '@/app/core/users/http/router'

import { bankAccountsRouter } from '@/app/core/bank_accounts/http/router'

const router = Router()

router.use(usersRouter)
router.use(sessionsRouter)
router.use(profileRouter)

router.use(bankAccountsRouter)

export { router }
