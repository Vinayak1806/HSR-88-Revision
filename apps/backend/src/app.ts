import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import pinoHttp from 'pino-http'
import { env } from './config/env.js'
import { logger } from './utils/logger.js'
import { apiRouter } from './routes/index.js'
import { errorHandler } from './middleware/error.js'
import { notFound } from './middleware/notFound.js'

export function buildApp() {
  const app = express()

  app.use(helmet())
  app.use(
    cors({
      origin: env.corsOrigins.length ? env.corsOrigins : true,
      credentials: true,
    }),
  )
  app.use(express.json({ limit: '1mb' }))
  app.use(cookieParser())
  app.use(pinoHttp({ logger }))

  app.use('/api', apiRouter)

  app.use(notFound)
  app.use(errorHandler)

  return app
}
