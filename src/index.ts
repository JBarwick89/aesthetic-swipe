import { OpenAPIHono } from '@hono/zod-openapi'
import { aicProvider } from './providers/aic'

const app = new OpenAPIHono()

app.get('/', (c) => {
  return c.text('Aesthetic Swipe')
})

app.get('/artwork/random', async (c) => {
  const artwork = await aicProvider.getRandomArtwork()
  return c.json(artwork)
})

app.get('/error', (c) => {
  throw new Error('This is a test error')
})

app.notFound(c => c.json({
  message: `'The requested resource was not found' - ${c.req.path}`,
}, 404))

app.onError((err, c) => {
  console.error(`Error occurred while handling request to ${c.req.path}:`, err)
  return c.json({ message: 'Internal Server Error' }, 500)
})

export default app
