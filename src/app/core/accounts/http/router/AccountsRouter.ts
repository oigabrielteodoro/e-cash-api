import { Router } from 'express'

import { validBodyBySchema, validParamsBySchema } from '@/lib'
import { CREATE_ACCOUNT, DELETE_ACCOUNT, LIST_ACCOUNTS } from '@/routes'
import { verifyAuthentication } from '@/app/interceptors'

import { AuthProviderInstance } from '@/app/providers/AuthProvider'
import {
  createAccountSchema,
  deleteAccountSchema,
} from '@/app/core/accounts/types'
import { AccountsController } from '@/app/core/accounts/http/controllers'

const router = Router()
const accountsController = new AccountsController()

router.use(verifyAuthentication(new AuthProviderInstance()))

router.get(LIST_ACCOUNTS, accountsController.index)
router.post(
  CREATE_ACCOUNT,
  validBodyBySchema(createAccountSchema),
  accountsController.create,
)
router.delete(
  DELETE_ACCOUNT,
  validParamsBySchema(deleteAccountSchema),
  accountsController.delete,
)

export { router as accountsRouter }
