import { Router } from 'express'

import { CREATE_BANK_ACCOUNT, LIST_BANK_ACCOUNTS } from '@/routes'
import { verifyAuthentication } from '@/app/interceptors'

import { AuthProviderInstance } from '@/app/providers/AuthProvider'
import { BankAccountsController } from '@/app/core/bank_accounts/http/controllers'

const router = Router()
const bankAccountsController = new BankAccountsController()

router.use(verifyAuthentication(new AuthProviderInstance()))

router.get(LIST_BANK_ACCOUNTS, bankAccountsController.index)
router.post(CREATE_BANK_ACCOUNT, bankAccountsController.create)

export { router as bankAccountsRouter }
