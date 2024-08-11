import express from 'express';
import { ArtistGeneralCommissionSchema } from '../../schema/artistGeneralCommission';
import validateReq from '../../helpers/zodValidationGeneric';
import { verifyJWT } from '../../helpers/jwt';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();

router.get(
    '/:artistId',
    validateReq(ArtistGeneralCommissionSchema),
    verifyJWT(),
    async (req: Express.Request, res: Express.Response) => {
        try {
            const artistId = req?.params['artistId'];

            if (artistId) {
                const findArtistCommissions = await
                    prisma.artistGeneralCommission.findMany({
                        where: {
                            artistId: artistId,
                        },
                    });

                return findArtistCommissions;
            }

        } catch (err) {
            return err;
        }
    },
);

//non-param post is 
router.post('/')
