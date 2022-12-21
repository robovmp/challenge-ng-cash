import { Router } from 'express'
import LoginService from '../services/Login'
import loginValidation from '../middlewares/loginValidation'

const router = Router()

router.post('/', loginValidation, LoginService.store)

export const LoginController: Router = router
