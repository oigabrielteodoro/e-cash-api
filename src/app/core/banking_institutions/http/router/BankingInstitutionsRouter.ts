import { Router } from 'express'

import { LIST_BANKING_INSTITUTIONS } from '@/routes'
import { BankingInstitutionsController } from '@/app/core/banking_institutions/http/controllers'

const router = Router()
const bankingInstitutionsController = new BankingInstitutionsController()

router.get(LIST_BANKING_INSTITUTIONS, bankingInstitutionsController.index)

export { router as bankingInstitutionsRouter }
