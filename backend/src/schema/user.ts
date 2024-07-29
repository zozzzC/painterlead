import { z } from "zod";

export const UserSchema = z.object({ 
    username: z.string({
        required_error: "Username is required",
    }),
    email: z.string({
        required_error: "Email is required",
    }).email(),
    password: z.string({
        required_error: "Password is required"
    })
}).required()

type User = z.infer<typeof UserSchema>

export const LoginUserSchema = UserSchema.omit({username: true})
