import { describe, expect, it } from 'bun:test'
import app from '../index'

describe('GET /', () => {
  it('returns 200', async () => {
    const res = await app.fetch(new Request('http://localhost/'))
    expect(res.status).toBe(200)
  })
})

describe('GET /artwork/random', () => {
  it('returns 200 with an artwork object', async () => {
    const res = await app.fetch(new Request('http://localhost/artwork/random'))
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body).toMatchObject({
      id: expect.any(String),
      source: 'aic',
      title: expect.any(String),
      artist: expect.any(String),
      date: expect.any(String),
    })
  })

  it('returns a different artwork on repeated calls', async () => {
    const results = await Promise.all(
      Array.from({ length: 5 }, async () => {
        const res = await app.fetch(new Request('http://localhost/artwork/random'))
        return res.json()
      }),
    )

    const ids = results.map((r: any) => r.id)
    const unique = new Set(ids)
    expect(unique.size).toBeGreaterThan(1)
  })
})
