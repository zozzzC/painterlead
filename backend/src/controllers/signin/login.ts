import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { Jwt } from "jsonwebtoken";
const prisma = new PrismaClient();

export default async function loginUser({email, password} : {email: string; password: string;}) { 
    try { 
        const errors: {[key: string]: any} = {};
        errors["error"] = {};  
    
        const findEmail = await prisma.user.findUnique({
            where: { 
                email: email
            }
        })
        
        if (findEmail === null) { 
            errors.error.email = "Email has not been registered."
            if (JSON.stringify(errors.error) !== null) { 
                return errors.error;
            }
        }  else { 
            //NOTE: this has to be an await since if we used the default
            //bcrypt compare implementation, then it would not wait for it to execute and would 
            //execute other code before it since bcrypt.compare was async and did not return a promise
            const match = await bcrypt.compare(password, findEmail.password);
            if (!match) { 
                errors.error.password = "Passwords do not match."
                return errors.error;
            } 
        }

        return {};

    } catch (err) { 
        return err;
    }

}