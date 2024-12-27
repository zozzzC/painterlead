import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();
import { s3ArtistImage } from '../../types/artistImages';
import validateReq from '../../middlewares/zodValidationGeneric';
import { S3UserRecordSchema } from '../../schema/s3UserRecord';

router.post(
    '/',
    validateReq(S3UserRecordSchema),
    async (req: express.Request, res: express.Response) => {
        try {
            const token = req.query['access'];

            if (token != process.env.JWT) {
                return res.sendStatus(403);
            }

            const body = req.body as s3ArtistImage;
            const userId = req.body.userId;
            const url = req.body.url;

            await prisma.artistImages.create({
                data: {
                    artistId: userId,
                    s3Url: JSON.stringify(url),
                },
            });
            return res.sendStatus(201);
        } catch (err) {
            res.sendStatus(500);
        }
    },
);
