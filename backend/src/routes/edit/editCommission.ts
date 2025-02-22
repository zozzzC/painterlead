import express from 'express';
import { ArtistGeneralCommissionSchema } from '../../schema/artistGeneralCommission';
import validateReq from '../../middlewares/zodValidationGeneric';
import { PrismaClient } from '@prisma/client';
import { checkJwt } from '../../middlewares/auth0Jwt';
import {
    ExistsError,
    NotFoundForGivenItem,
} from '../../helpers/error/errorTypes';
import { getIdFromEmail } from '../../helpers/getIdFromEmail';
import { createCommission } from '../../controllers/edit/editCommission';
const prisma = new PrismaClient();
const router = express.Router();

router.get(
    '/:commissionId',
    async (req: express.Request, res: express.Response) => {
        const commissionId = req?.params['commissionId'];

        const findCommission = await prisma.artistGeneralCommission.findFirst({
            where: {
                id: commissionId,
            },
        });

        if (findCommission) {
            return res.status(200).json(findCommission);
        }

        return res.sendStatus(404);
    },
);

router.get(
    '/artist/:artistId',
    async (req: express.Request, res: express.Response) => {
        const artistId = req?.params['artistId'];

        const findArtistCommission =
            await prisma.artistGeneralCommission.findMany({
                where: {
                    artistId: artistId,
                },
            });

        if (findArtistCommission.length != 0) {
            //need to use this since findMany returns an array
            return res.status(200).json(findArtistCommission);
        }

        return res.sendStatus(404);
    },
);

//non-param post means new commission
//TODO: move the logic in this to a controller
router.post(
    '/',
    validateReq(ArtistGeneralCommissionSchema),
    checkJwt,
    async (req: express.Request, res: express.Response) => {
        // @ts-ignore
        const token = req.auth[`email`];
        const id = await getIdFromEmail(token);
        const commissionId = req?.params['commissionId'];
        const { name }: { name: string } = req.body;
        await createCommission({ id: id, commissionDetails: req.body });

        if (name && id) {
            const nameExists = await prisma.artistGeneralCommission.findUnique({
                //@ts-ignore
                where: {
                    artistId: id,
                    name: name,
                },
            });

            if (nameExists) {
                throw new ExistsError(`Commission name ${name}`);
            }

            await prisma.artistGeneralCommission.create({
                data: {
                    ...req.body,
                    artistId: id,
                },
            });
            res.sendStatus(201);
        } else {
            res.sendStatus(400);
        }
    },
);

//paramed post means edit existing post
router.post(
    '/commission/:commissionId',
    validateReq(ArtistGeneralCommissionSchema),
    checkJwt,
    async (req: express.Request, res: express.Response) => {
        // @ts-ignore
        const email = req.auth[`email`];
        const id = await getIdFromEmail(email);

        const commissionId = req?.params['commissionId'];

        if (email) {
            const matchJWTWithCommission =
                await prisma.artistGeneralCommission.findUnique({
                    where: {
                        // @ts-ignore
                        artistId: parseInt(id),
                        id: commissionId,
                    },
                });

            if (matchJWTWithCommission) {
                await prisma.artistGeneralCommission.update({
                    where: {
                        id: commissionId,
                    },
                    data: { ...req.body },
                });
                res.sendStatus(200);
            } else {
                res.sendStatus(403);
            }

            res.sendStatus(403);
        }
    },
);

router.delete(
    '/commission/:commissionId',
    checkJwt,
    async (req: express.Request, res: express.Response) => {
        // @ts-ignore
        const email = req.auth[`email`];
        const id = await getIdFromEmail(email);

        const commissionId = req.params.commissionId;

        if (email) {
            const matchJWTWithCommission =
                await prisma.artistGeneralCommission.findUnique({
                    where: {
                        // @ts-ignore
                        artistId: parseInt(id),
                        id: commissionId,
                    },
                });

            if (matchJWTWithCommission) {
                await prisma.artistGeneralCommission.delete({
                    where: {
                        id: commissionId,
                    },
                });
                res.sendStatus(200);
            } else {
                res.sendStatus(403);
            }

            res.sendStatus(403);
        }
    },
);

export default router;
