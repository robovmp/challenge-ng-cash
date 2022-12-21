import { HealthCheckController } from '../controllers/HealthCheck'
import { TransactionController } from '../controllers/Transaction'
import { Router } from 'express'

const router = Router()

const defaultRoutes = [
    {
        path: '/health',
        route: HealthCheckController,
    },
    {
        path: '/transactions',
        route: TransactionController,
    }
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

export const Routes: Router = router
