import { body, validationResult, ValidationChain } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

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
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('username').isString().notEmpty().withMessage('Username is required'),
  body('avatar').isString().optional(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
])

export const validateLogin = validate([
  body('username').isString().notEmpty().withMessage('Username is required'),
  body('password').isString().notEmpty().withMessage('Password is required'),
])
