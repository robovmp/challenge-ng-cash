import { Router } from 'express'
import TransactionService from '../services/Transaction'
import tokenValidation from '../middlewares/tokenValidation'
import verifyAccount from '../middlewares/verifyAccount'

const router = Router()

router.get('/', tokenValidation, TransactionService.index)
router.post('/', tokenValidation, verifyAccount, TransactionService.store)

export const TransactionController: Router = router
