import { Router } from 'express'
import { healthRouter } from './health.js'

export const apiRouter = Router()

apiRouter.use('/health', healthRouter)

// Feature routers land here as tickets close:
// apiRouter.use('/auth', authRouter)
// apiRouter.use('/quizzes', quizRouter)
// apiRouter.use('/doubts', doubtRouter)
// apiRouter.use('/admin', adminRouter)
