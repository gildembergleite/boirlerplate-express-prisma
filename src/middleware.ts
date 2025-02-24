import { NextFunction, Request, Response } from 'express'
import { ValidationChain, body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await Promise.all(validations.map(validation => validation.run(req)))

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
      return
    }

    next()
  }
}

export const validateUser = validate([
  body('name').isString().notEmpty().withMessage('name is required'),
  body('username').isString().notEmpty().withMessage('username is required'),
  body('email').isString().notEmpty().withMessage('email is required'),
  body('avatar').isString().optional(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
])

export const validateLink = validate([
  body('title').isString().notEmpty().withMessage('title is required'),
  body('url').isString().notEmpty().withMessage('url is required'),
])

export const validateLogin = validate([
  body('email').isString().notEmpty().withMessage('email is required'),
  body('password').isString().notEmpty().withMessage('password is required'),
])

export const validateRefreshToken = validate([
  body('refreshToken').isString().notEmpty().withMessage('refreshToken is required'),
])

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization']
  
  if (!authHeader) {
    res.status(401).json({ message: 'Authorization header is required' })
    return
  }

  const parts = authHeader.split(' ')
  
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    res.status(401).json({ message: 'Invalid token format. Expected "Bearer <token>"' })
    return
  }

  const token = parts[1]

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Invalid or expired token' })
      return
    }
    
    req.body.user = decoded
    
    next()
  })
}
