import { Router } from 'express'
import { UserController } from '../controllers/user-controller'
import { authenticateToken, validateUser } from '../middleware'

const router = Router()

router.get('/', authenticateToken, UserController.getAllUsers)
router.get('/:id', authenticateToken, UserController.getUserById)
router.post('/', validateUser, UserController.createUser)
router.patch('/:id', authenticateToken, UserController.updateUser)
router.delete('/:id', authenticateToken, UserController.deleteUser)

export { router as userRoutes }
