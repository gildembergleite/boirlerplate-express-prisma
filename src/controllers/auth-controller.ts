import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserService } from '../services/user-service'
import { prisma } from '../config/prisma-client'

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body

      const user = await UserService.authenticateUser(username, password)

      const accessToken = jwt.sign(
        { id: user.id },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '15m' }
      )

      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: '7d' }
      )

      await prisma.refreshToken.create({
        data: {
          tokenHash: refreshToken,
          userId: user.id,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
      })

      res.json({
        user,
        accessToken,
        refreshToken
      })
    } catch (err) {
      const error = err as Error
      res.status(401).json({ message: error.message })
    }
  }
}
