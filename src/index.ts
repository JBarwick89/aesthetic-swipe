import { OpenAPIHono } from '@hono/zod-openapi'

const app = new OpenAPIHono()

app.get('/', (c) => {
  return c.text('Aesthetic Swipe')
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
