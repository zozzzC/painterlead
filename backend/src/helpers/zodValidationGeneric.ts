import {Request, Response, NextFunction} from "express";
import {z, ZodError } from "zod";

//the reason why we return req, res, and next is because this is an example of configurable middleware (more info: https://medium.com/@jaeger.rob/configurable-express-middleware-3982d70af1e7)
export default function validateReq(schema: z.ZodObject<any>) { 
    return (req: Request, res: Response, next: NextFunction) => { 
        try { 
            schema.parse(req.body);
            next();
        } catch (err) { 
            if (err instanceof ZodError) { 
                res.status(400).json(err.flatten());
            } else { 
                res.status(500).json({error: "Internal Sever Error"});
            }
        }
    }
    
}