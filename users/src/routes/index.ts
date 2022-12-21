import { HealthCheckController } from '../controllers/HealthCheck'
import { UserController } from '../controllers/User'
import { Router } from 'express'

const router = Router()

const defaultRoutes = [
    {
        path: '/health',
        route: HealthCheckController,
    },
    {
        path: '/users',
        route: UserController,
    },
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

export const Routes: Router = router
