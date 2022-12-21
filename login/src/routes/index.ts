import { HealthCheckController } from '../controllers/HealthCheck'
import { LoginController } from '../controllers/Login'
import { Router } from 'express'

const router = Router()

const defaultRoutes = [
    {
        path: '/health',
        route: HealthCheckController,
    },
    {
        path: '/login',
        route: LoginController,
    },
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

export const Routes: Router = router
