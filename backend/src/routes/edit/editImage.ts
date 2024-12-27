import express from 'express';
const router = express.Router();
import { signedUrlPut } from '../../helpers/s3';
import { getUserId } from '../../helpers/getUserId';
import responseError from '../../helpers/error/error';
import { PrismaClient } from '@prisma/client';
import { checkJwt } from '../../middlewares/auth0Jwt';
const prisma = new PrismaClient();

router.post(
    '/',
    checkJwt,
    async (req: express.Request, res: express.Response) => {
        const errors = new responseError();
        try {
            // @ts-ignore
            const email = req?.auth?.email;
            const userId = await getUserId({ email });

            if (userId) {
                const fileType = req.query.fileType as string;
                const url = await signedUrlPut({ userId, fileType });
                console.log('s3 url: ' + url);

                // prisma.artistImages.create({
                //     data: {
                //     artistId: userId,
                //     s3Url:
                // }
                // })
                return res.status(201).send(url);
            }

            errors.createNewError({
                errorType: 'userId',
                errorMessage: 'No userId specified.',
            });

            return res.status(400).json(errors);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    },
);

export default router;
