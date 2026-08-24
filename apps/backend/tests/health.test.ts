import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { buildApp } from '../src/app.js'

describe('GET /api/health', () => {
  it('returns ok', async () => {
    const app = buildApp()
    const res = await request(app).get('/api/health')
    expect(res.status).toBe(200)
    expect(res.body.data.status).toBe('ok')
  })
})
