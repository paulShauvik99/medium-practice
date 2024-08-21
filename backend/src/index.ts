import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'



const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    SECRET_ACCESS_TOKEN : string
  }
}>()

app.get('/', (c) => {
  return c.notFound()
})


app.get('/api/v1/blog/:id', (c) => {
  return c.notFound()
})
app.get('/api/v1/blog/bulk', (c) => {
  return c.notFound()
})


app.post('/api/v1/user/signup', async (c)=> {


  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json()

  const user = await prisma.user.create({
    data : {
      email : body.email,
      password : body.password,
      name : body.name,
    }
  })

  const token = await sign({id : user.id , email : user.email } , c.env.SECRET_ACCESS_TOKEN , "HS512")

  return c.json({ "token" : token})


})


app.post('/api/v1/user/signin', (c)=> {
  return c.text('signin')
})
app.post('/api/v1/blog', (c)=> {
  return c.text('blog post')
})
app.put('/api/v1/blog', (c)=> {
  return c.text('blog put')
})


export default app
