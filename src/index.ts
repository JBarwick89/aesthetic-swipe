import { OpenAPIHono } from '@hono/zod-openapi'

const app = new OpenAPIHono()

app.get('/', (c) => {
  return c.text('Aesthetic Swipe CMOP')
})

app.notFound(c => c.json({
  message: `'The requested resource was not found' - ${c.req.path}`,
}, 404))

export default app
