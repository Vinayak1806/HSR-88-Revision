import mongoose from 'mongoose'
import { env } from './env.js'
import { logger } from '../utils/logger.js'

export async function connectDb() {
  mongoose.set('strictQuery', true)
  await mongoose.connect(env.MONGO_URI, {
    serverSelectionTimeoutMS: 10_000,
  })
  logger.info({ db: mongoose.connection.name }, 'mongo connected')
}

export async function disconnectDb() {
  await mongoose.disconnect()
}
