import { Router } from 'express'
import { AuthController } from '../controllers/auth-controller'
import { validateLogin } from '../middleware'

const router = Router()

router.post('/login', validateLogin, AuthController.login)

export { router as authRoutes } 
