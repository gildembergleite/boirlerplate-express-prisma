import { Router } from 'express'
import { AuthController } from '../controllers/auth-controller'
import { validateLogin, validateRefreshToken } from '../middleware'

const router = Router()

router.post('/login', validateLogin, AuthController.login)
router.post('/refresh', validateRefreshToken, AuthController.refreshToken)

export { router as authRoutes }
