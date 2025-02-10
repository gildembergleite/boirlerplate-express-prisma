import { Request, Response } from 'express'
import { UserService } from '../services/user-service'

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body
      const user = await UserService.authenticateUser(username, password)
      res.json(user)
    } catch (err) {
      const error = err as Error
      res.status(401).json({ message: error.message })
    }
  }
}
