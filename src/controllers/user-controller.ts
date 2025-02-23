import { Request, Response } from 'express'
import { UserService } from '../services/user-service'

export class UserController {
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers()
      res.json(users)
    } catch (err) {
      const error = err as Error
      res.status(500).json({ message: error.message })
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.getUserById(req.params.id)
      res.json(user)
    } catch (err) {
      const error = err as Error
      res.status(404).json({ message: error.message })
    }
  }

  static async getUserDetails(req: Request, res: Response): Promise<void> {
    if (!req.body.user) {
      res.status(401).json({ message: 'Token inválido' })
      return
    }

    const user = await UserService.getUserById(req.body.user.id)

    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' })
      return
    }

    res.json(user)
  }

  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const newUser = await UserService.createUser(req.body)
      res.status(201).json(newUser)
    } catch (err) {
      const error = err as Error
      res.status(400).json({ message: error.message })
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const updatedUser = await UserService.updateUser(req.params.id, req.body)
      res.json(updatedUser)
    } catch (err) {
      const error = err as Error
      res.status(400).json({ message: error.message })
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      await UserService.deleteUser(req.params.id)
      res.status(204).end()
    } catch (err) {
      const error = err as Error
      res.status(404).json({ message: error.message })
    }
  }
}
