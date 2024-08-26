import z from "zod"

// Creating zod validation for signup inputs
export const signupInput = z.object({
    email : z.string().email(),
    password : z.string().min(6),
    name : z.string().optional()
})
// Creating zod validation for signin inputs
export const signinInput = z.object({
    email : z.string().email(),
    password : z.string().min(6),
})
// Creating zod validation for create blog inputs
export const createBlogInput = z.object({
    title : z.string(),
    content : z.string()
})
// Creating zod validation for update blog inputs
export const updateBlogInput = z.object({
    title : z.string(),
    content : z.string(),
    id : z.string(),
})


// Type inference for signup inputs ( bcz in typescript we extend/use the type/interface to specify the type)
export type SignupInput = z.infer<typeof signupInput>
// Type inference for signin inputs
export type SigninInput = z.infer<typeof signinInput>
// Type inference for create blog inputs
export type CreateBlogInput = z.infer<typeof createBlogInput>
// Type inference for update blogs inputs
export type UpdateBlogInput = z.infer<typeof updateBlogInput>
