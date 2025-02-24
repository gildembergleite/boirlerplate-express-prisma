import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../config/prisma-client'
import { AuthService } from '../services/auth-service'

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const user = await AuthService.authenticateUser(email, password)

      const accessToken = jwt.sign(
        { id: user.id },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '30m' }
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
        accessToken,
        refreshToken
      })
    } catch (err) {
      const error = err as Error
      res.status(401).json({ message: error.message })
    }
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body

      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string
      ) as { id: string }

      const userId = decoded.id

      const storedToken = await prisma.refreshToken.findFirst({
        where: {
          tokenHash: refreshToken,
          userId,
        },
      })

      if (!storedToken) {
        res.status(401).json({ message: 'Invalid refresh token' })
        return
      }

      if (new Date(storedToken.expiresAt) < new Date()) {
        res.status(401).json({ message: 'Refresh token expired' })
        return
      }

      const newAccessToken = jwt.sign(
        { id: userId },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '30m' }
      )

      res.json({ accessToken: newAccessToken })
    } catch (error) {
      res.status(401).json({ message: 'Invalid refresh token' })
    }
  }
}
