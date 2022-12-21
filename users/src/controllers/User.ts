import { Router } from 'express'
import UserService from '../services/User'
import userValidation from '../middlewares/userValidation'
import tokenValidation from '../middlewares/tokenValidation'

const router = Router()

router.get('/', tokenValidation, UserService.index)
router.post('/', userValidation, UserService.store)

export const UserController: Router = router
