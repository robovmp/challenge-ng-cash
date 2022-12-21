import service from '../services/HealthCheck'
import { Router } from 'express'

const router = Router()

router.get('/', service)

export const HealthCheckController: Router = router
