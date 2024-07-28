import bcrypt from "bcrypt";
import { UserSchema } from "../../schema/user";
import { z, ZodError } from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function registerUser({ username, email, password } : {username: string, email: string, password:string}) { 
    try { 
        const errors: {[key: string]: any} = {};
        errors["error"] = {}; 
        const user = UserSchema.parse({username, email, password});
        
        const findEmail = await prisma.user.findUnique({
            where: { 
                email: email,
            }
        })

        if (findEmail) { 
            errors.error.email = 'That email has already been registered.'
        }

        const findUsername = await prisma.user.findUnique({
            where: { 
                username: username,
            }
        })

        if (findUsername) { 
            errors.error.sername = 'That username has already been registered.'
        }

        if (errors.error !== null){
            return errors;
        }

        const hash = await bcrypt.hash(password, 15);

        await prisma.user.create({
            data:
            {
                email: email,
                username: username,
                password: hash,
            }
        })

        return {};

    } catch (err : any) {
        if (err instanceof z.ZodError) { 
            return err.flatten();
        }
        throw new Error(err);
    }
}