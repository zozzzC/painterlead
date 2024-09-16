import express, { NextFunction } from 'express';
import { signedUrlPut } from '../../helpers/s3';
import { checkJwt } from '../../middlewares/auth0Jwt';
import { getIdFromEmail } from '../../helpers/getIdFromEmail';
import resResult from '../../helpers/resResult';
import { GenericNotFound } from '../../helpers/error/errorTypes';
const router = express.Router();

router.get(
    '/',
    checkJwt,
    async (req: express.Request, res: express.Response, next: NextFunction) => {
        const nRequests = req.query.num;
        const fileType = JSON.stringify(req.query.fileType);
        console.log('sent');
        console.log(fileType);

        if (!fileType) {
            return res.sendStatus(400);
        }

        // @ts-ignore
        const token = req.auth[`email`];
        const userId = await getIdFromEmail(token);
        if (!nRequests) {
            if (userId) {
                const url = await signedUrlPut({ userId, fileType });
                if (resResult({ result: url })) {
                    return res.status(200).json(url);
                }
                return res.status(400).json(url);
            }
        } else if (nRequests && userId) {
            let responses = [];

            for (let index = 0; index <= Number(nRequests); index++) {
                const url = await signedUrlPut({ userId, fileType });
                responses.push(url);
            }
            return res.status(200).json(responses);
        }

        if (userId) {
            const result = await signedUrlPut({ userId, fileType });
            return res.status(200).json(result);
        }

        throw new GenericNotFound('User');
    },
);

export default router;
