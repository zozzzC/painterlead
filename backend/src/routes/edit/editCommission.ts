import express from 'express';
import { ArtistGeneralCommissionSchema } from '../../schema/artistGeneralCommission';
import validateReq from '../../middlewares/zodValidationGeneric';
import { verifyJWT } from '../../helpers/jwt';
import { PrismaClient } from '@prisma/client';
import { checkJwt } from '../../middlewares/auth0Jwt';
import { ExistsError } from '../../helpers/error/errorTypes';
import { getIdFromEmail } from '../../helpers/getIdFromEmail';
import { createCommission } from '../../controllers/edit/editCommission';
const prisma = new PrismaClient();
const router = express.Router();

router.get('/artist/:commissionId', async (req: express.Request, res: express.Response) => {
    
})

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

//non-param post means new commission
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
        await createCommission({id: id, commissionDetails: req.body})


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
