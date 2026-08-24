import { Router } from 'express'
import mongoose from 'mongoose'

export const healthRouter = Router()

healthRouter.get('/', (_req, res) => {
  const dbState = mongoose.connection.readyState // 1 = connected
  res.json({
    data: {
      status: 'ok',
      db: dbState === 1 ? 'up' : 'down',
      uptimeSec: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    },
  })
})
