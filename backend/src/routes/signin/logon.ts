import express from "express";
import { LoginUserSchema } from "../../schema/user";
import validateReq from "../../helpers/zodValidationGeneric";
import loginUser from "../../controllers/signin/login";
const router = express.Router();

router.post("/", validateReq(LoginUserSchema), async (req: express.Request, res: express.Response) => { 
    try { 
        const { email, password  } = req.body;
        const user = await loginUser({ email, password });

        console.log(user)


        if (Object.keys(user).length === 0) { 
            res.status(201).json(req.body);
        } else { 
            res.status(400).json(user);
        }
    } catch (err) { 
        res.status(500).send(err);
    }
})

export default router;