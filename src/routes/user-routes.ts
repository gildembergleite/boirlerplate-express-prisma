import { Router } from 'express'
import { UserController } from '../controllers/user-controller'
import { validateUser } from '../middleware'

const router = Router()

router.get('/', UserController.getAllUsers)
router.get('/:id', UserController.getUserById)
router.post('/', validateUser, UserController.createUser)
router.put('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)

export { router as userRoutes }
