import { Router } from 'express'

import {
  usersRouter,
  sessionsRouter,
  profileRouter,
} from '@/app/core/users/http/router'

import { categoriesRouter } from '@/app/core/categories/http/router'
import { accountsRouter } from '@/app/core/accounts/http/router'
import { bankingInstitutionsRouter } from '@/app/core/banking_institutions/http/router'

const router = Router()

router.use(sessionsRouter)
router.use(bankingInstitutionsRouter)
router.use(usersRouter)
router.use(profileRouter)
router.use(categoriesRouter)
router.use(accountsRouter)

export { router }
