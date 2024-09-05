import express from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req: express.Request, res: express.Response) => {
    const userEmail = req.query['email'];
    const token = req.query['access'];
    console.log(userEmail);
    if (userEmail && token === process.env.JWT) {
        try {
            await prisma.user.create({
                data: {
                    //@ts-ignore
                    email: userEmail,
                },
            });
        } catch (err : any) { 
            return res.status(400).send("Email already exists");
        }
        return res.sendStatus(201);
    }
    return res.sendStatus(500);
});

export default router;
