import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import {signupInput,signinInput} from '../../../common/src/index'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        SECRET_ACCESS_TOKEN : string
    }
}>();



userRouter.post('/signup', async (c)=> {

    const body = await c.req.json()
    const { success } = signupInput.safeParse(body)
    if (!success) {
        c.status(411)
        return c.json({ "status" : "Invalid Inputs"})
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const user = await prisma.user.create({
            data : {
                email : body.email,
                password : body.password,
                name : body.name,
            }
        })
    
        const token = await sign({id : user.id , email : user.email } , c.env.SECRET_ACCESS_TOKEN , "HS512")
        return c.json({ "token" : token})
        
    } catch (error) {
        console.log(error)
        c.status(411)
        return c.json({ "error" : "Invalid!"})
    }
    
})

userRouter.post('/signin', async (c)=> {
    const body = await c.req.json()
    const { success } = signinInput.safeParse(body)
    if (!success) {
        c.status(411)
        return c.json({ "status" : "Invalid Inputs"})
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        })
        
        if(!user){
            c.status(403)
            return c.json({ "status" : "User not Found"})
        }else{
            const token = await sign({id : user.id , email : user.email } , c.env.SECRET_ACCESS_TOKEN , "HS512")
            c.status(200)
            return c.json({ "token" : token, "status" : "User Successfully Signed In"})
        }
    } catch (error) {
        console.log(error)
        c.status(411)
        return c.json({ "error" : "Invalid!"})
    }
})
