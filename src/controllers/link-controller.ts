import { Request, Response } from 'express'
import { LinksService } from '../services/links-service'

export class LinksController {
  static async getAllLinks(req: Request, res: Response) {
    try {
      const { user } = req.body
      const links = await LinksService.getAllLinks(user.id)
      res.status(200).json(links)
    } catch (err) {
      const error = err as Error
      res.status(500).json({ error: error.message })
    }
  }

  static async getLinkById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { user } = req.body

      const link = await LinksService.getLinkById(id, user.id)
      res.status(200).json(link)
    } catch (err) {
      const error = err as Error
      res.status(404).json({ error: error.message })
    }
  }

  static async createLink(req: Request, res: Response) {
    try {
      const { title, url, user } = req.body

      const newLink = await LinksService.createLink({ title, url, postedByUserId: user.id })
      res.status(201).json(newLink)
    } catch (err) {
      const error = err as Error
      res.status(500).json({ error: error.message })
    }
  }

  static async updateLink(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { user, ...updateData } = req.body

      const updatedLink = await LinksService.updateLink(id, updateData, user.id)
      res.status(200).json(updatedLink)
    } catch (err) {
      const error = err as Error
      res.status(404).json({ error: error.message })
    }
  }

  static async deleteLink(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { user } = req.body

      await LinksService.deleteLink(id, user.id)
      res.status(204).send()
    } catch (err) {
      const error = err as Error
      res.status(404).json({ error: error.message })
    }
  }
}