import { buildApp } from './app.js'
import { connectDb, disconnectDb } from './config/db.js'
import { env } from './config/env.js'
import { logger } from './utils/logger.js'

async function main() {
  await connectDb()
  const app = buildApp()

  const server = app.listen(env.PORT, () => {
    logger.info({ port: env.PORT }, 'server listening')
  })

  const shutdown = async (signal: string) => {
    logger.info({ signal }, 'shutting down')
    server.close(async () => {
      await disconnectDb()
      process.exit(0)
    })
    setTimeout(() => process.exit(1), 10_000).unref()
  }
  process.on('SIGTERM', () => void shutdown('SIGTERM'))
  process.on('SIGINT', () => void shutdown('SIGINT'))
}

main().catch((err) => {
  logger.error({ err }, 'fatal startup error')
  process.exit(1)
})
