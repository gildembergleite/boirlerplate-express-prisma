import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { userRoutes } from './routes/user-routes'

dotenv.config()

const app: Application = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API is running!' })
})

app.use('/users', userRoutes)

export { app }