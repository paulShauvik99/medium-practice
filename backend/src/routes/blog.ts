import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from '../../../common/src/index'

export const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        SECRET_ACCESS_TOKEN : string,
    },
    Variables : {
        userId : string,
    }
}>();


blogRouter.use("/*", async (c, next) => {
    const token = c.req.header("token")?.split(" ")[1]

    try {
        
        const user:any = await verify(token || "" , c.env.SECRET_ACCESS_TOKEN, 'HS512')
    
        if(user){
            c.set("userId" , user.id)
            await next()
        }else{
            c.status(403)
            return c.json({"status" : "You are not Logged In"})
        }
    } catch (error) {
        console.log(error)
        c.status(411)
        return c.json({"status" : "Invalid"})
    }
})



blogRouter.post('/',async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json({ "status": "Invalid Inputs" });
    }
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const authorId = c.get("userId")
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                authorId: authorId,
                content: body.content
            }
        })
    
        c.status(200)
        return c.json({ "status" : "Blog Created", "id" : blog.id})

    } catch (error) {
        console.log(error)
        c.status(411)
        return c.json({ "status" : "Failed! Invalid"})        
    }
})

blogRouter.put("/", async (c)=>{
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json({ "status": "Invalid Inputs" });
    }
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.update({
            where: {
                id : body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        })

        return c.json({"status" : "Blog Updated", "id" : blog.id})  

    } catch (error) {
        console.log(error)
        c.status(411)
        return c.json({"status" : "Updatation Failed"})
    }
})

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())


    try {
        const blogs = await prisma.blog.findMany({
            select : {
                content: true,
                title : true,
                id : true,
                author : {
                    select : {
                        name : true, 
                    }
                }
            }
        })
        return c.json({"status" : "Blogs Returned", "blogs" : blogs})
    } catch (error) {
        console.log(error)
        c.status(411)
        return c.json({"status" : "Blog not found"})        
    }
})


blogRouter.get("/:id", async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: id
            },
            select : {
                id: true,
                content : true,
                title : true,
                author : {
                    select : {
                        name : true,
                    }
                }
            }
        })
        return c.json({"status": "Blog Found", "blog": blog})
    } catch (error) {
        console.log(error)        
        c.status(411)
        return c.json({"status": "Blog Not Found"}) 
    }
})

