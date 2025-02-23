import cors from 'cors'
import dotenv from 'dotenv'
import express, { Application } from 'express'
import { UserController } from './controllers/user-controller'
import { authenticateToken } from './middleware'
import { authRoutes } from './routes/auth-routes'
import { linkRoutes } from './routes/links-routes'
import { userRoutes } from './routes/user-routes'

dotenv.config()

const app: Application = express()

app.use(cors())
app.use(express.json())

app.get('/', (_, res) => {
  res.json({ message: 'API is running!' })
})

app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/links', linkRoutes)
app.use('/me', authenticateToken, UserController.getUserDetails)

export { app }
