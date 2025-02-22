import { Router } from 'express'
import { UserController } from '../controllers/user-controller'
import { validateToken, validateUser } from '../middleware'

const router = Router()

router.get('/', validateToken, UserController.getAllUsers)
router.get('/:id', validateToken, UserController.getUserById)
router.post('/', validateUser, validateToken, UserController.createUser)
router.patch('/:id', validateToken, UserController.updateUser)
router.delete('/:id', validateToken, UserController.deleteUser)

export { router as userRoutes }
