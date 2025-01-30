import express from 'express';
const router = express.Router();
import { signedUrlPut } from '../../helpers/s3';
import { getUserId } from '../../helpers/getUserId';
import { PrismaClient } from '@prisma/client';
import { checkJwt } from '../../middlewares/auth0Jwt';
const prisma = new PrismaClient();

router.post(
    '/',
    checkJwt,
    async (req: express.Request, res: express.Response) => {
        // @ts-ignore
        const email = req?.auth?.email;
        const userId = await getUserId({ email });

        if (userId) {
            const fileType = req.query.fileType as string;
            const fileSize = req.query.fileSize as string;
            const url = await signedUrlPut({ userId, fileType, fileSize });
            console.log('s3 url: ' + url[1]);

            // prisma.artistImages.create({
            //     data: {
            //     artistId: userId,
            //     s3Url:
            // }
            // })
            return res.status(201).json({ s3Url: url[1] });
        }

        return res.sendStatus(400);
    },
);

export default router;
