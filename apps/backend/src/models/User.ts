import { Schema, model, type InferSchemaType } from 'mongoose'

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['student', 'admin', 'editor'], default: 'student' },
    streak: {
      current: { type: Number, default: 0 },
      longest: { type: Number, default: 0 },
      lastCompletedAt: { type: Date, default: null },
    },
    aiDoubtsUsedToday: { type: Number, default: 0 },
    aiDoubtsResetAt: { type: Date, default: null },
  },
  { timestamps: true },
)

export type UserDoc = InferSchemaType<typeof userSchema> & { _id: string }
export const User = model('User', userSchema)
