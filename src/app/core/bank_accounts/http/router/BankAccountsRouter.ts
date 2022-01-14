import { Router } from 'express'

import { validBodyBySchema } from '@/lib'
import { CREATE_BANK_ACCOUNT, LIST_BANK_ACCOUNTS } from '@/routes'
import { verifyAuthentication } from '@/app/interceptors'

import { AuthProviderInstance } from '@/app/providers/AuthProvider'
import { createBankAccountSchema } from '@/app/core/bank_accounts/types'
import { BankAccountsController } from '@/app/core/bank_accounts/http/controllers'

const router = Router()
const bankAccountsController = new BankAccountsController()

router.use(verifyAuthentication(new AuthProviderInstance()))

router.get(LIST_BANK_ACCOUNTS, bankAccountsController.index)
router.post(
  CREATE_BANK_ACCOUNT,
  validBodyBySchema(createBankAccountSchema),
  bankAccountsController.create,
)

export { router as bankAccountsRouter }
