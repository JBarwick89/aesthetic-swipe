import { OpenAPIHono } from '@hono/zod-openapi'

const app = new OpenAPIHono()

app.get('/', (c) => {
  return c.text('Aesthetic Swipe CMOP')
})

export default app
