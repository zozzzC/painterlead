import express from 'express';
import { ArtistGeneralCommissionSchema } from '../../schema/artistGeneralCommission';
import validateReq from '../../middlewares/zodValidationGeneric';
import { verifyJWT } from '../../helpers/jwt';
import { PrismaClient } from '@prisma/client';
import { checkJwt } from '../../middlewares/auth0Jwt';
const prisma = new PrismaClient();
const router = express.Router();

router.get(
    '/artist/:artistId',
    async (req: express.Request, res: express.Response) => {
        try {
            const artistId = req?.params['artistId'];

            if (artistId) {
                const findArtistCommissions =
                    await prisma.artistGeneralCommission.findMany({
                        where: {
                            artistId: artistId,
                        },
                    });

                return res.status(200).json(findArtistCommissions);
            }
        } catch (err) {
            return res.sendStatus(500);
        }
    },
);

router.get('/', async (req: express.Request, res: express.Response) => {
    console.log('edit get');
    res.sendStatus(201);
});

//non-param post means new post
router.post(
    '/',
    validateReq(ArtistGeneralCommissionSchema),
    checkJwt,
    async (req: express.Request, res: express.Response) => {
        try {
            // @ts-ignore
            const token = req.auth[`email`];
            const commissionId = req?.params['commissionId'];
            const { name }: { name: string } = req.body;

            const userId = await prisma.user.findUnique({
                where: {
                    email: token,
                },
            });

            if (name && userId) {
                const nameExists =
                    await prisma.artistGeneralCommission.findUnique({
                        //@ts-ignore
                        where: {
                            artistId: userId.id,
                            name: name,
                        },
                    });

                if (nameExists) {
                    res.sendStatus(400);
                }

                const newCommission =
                    await prisma.artistGeneralCommission.create({
                        data: {
                            ...req.body,
                            artistId: userId.id,
                        },
                    });

                return res.sendStatus(201);
            }

            res.sendStatus(400);
        } catch (err) {
            res.sendStatus(500);
        }
    },
);

//paramed post means edit existing post
router.post(
    '/commission/:commissionId',
    validateReq(ArtistGeneralCommissionSchema),
    verifyJWT(),
    async (req: express.Request, res: express.Response) => {
        // @ts-ignore
        const token = req?.token;
        const commissionId = req?.params['commissionId'];
        // @ts-ignore
        if (req.token) {
            const matchJWTWithCommission =
                await prisma.artistGeneralCommission.findUnique({
                    where: {
                        // @ts-ignore
                        artistId: parseInt(req.token.username),
                        id: commissionId,
                    },
                });
            // if (matchJWTWithCommission) {
            //     const updateCommission =
            //         await prisma.artistGeneralCommission.update({
            //             where: {
            //                 id: parseInt(commissionId),
            //             },
            //             update: req.body,
            //         });
            // }
        }
    },
);

export default router;
