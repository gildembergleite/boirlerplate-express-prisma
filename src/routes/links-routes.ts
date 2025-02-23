import { Router } from 'express'
import { LinksController } from '../controllers/link-controller'
import { authenticateToken, validateLink } from '../middleware'

const router = Router()

router.get('/', authenticateToken, LinksController.getAllLinks)
router.get('/:id', authenticateToken, LinksController.getLinkById)
router.post('/', validateLink, authenticateToken, LinksController.createLink)
router.patch('/:id', authenticateToken, LinksController.updateLink)
router.delete('/:id', authenticateToken, LinksController.deleteLink)

export { router as linkRoutes }
