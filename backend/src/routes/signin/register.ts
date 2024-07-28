import express from "express";
import registerUser from "../../controllers/signin/register"
import { register } from "module";
import { UserSchema } from "../../schema/user";
import validateReq from "../../helpers/zodValidationGeneric";
const router = express.Router();


router.post("/", validateReq(UserSchema), async (req: express.Request, res: express.Response) => { 
    try { 
        const { username, password, email } = req.body;
        const user = await registerUser({username, password, email});
        if (Object.keys(user).length == 0) { 
            res.status(201).json(req.body);
        } else { 
            res.status(400).json(user);
        }
    } catch (err) { 
        res.status(500).send(err);
    }
})

export default router;