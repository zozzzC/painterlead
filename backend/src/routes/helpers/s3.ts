import express from 'express';
import { signedUrlPut } from '../../helpers/s3';
import { checkJwt } from '../../middlewares/auth0Jwt';
import { getIdFromEmail } from '../../helpers/getIdFromEmail';
import resResult from '../../helpers/resResult';
import { GenericNotFound } from '../../helpers/error/errorTypes';
const router = express.Router();

router.get(
    '/',
    checkJwt,
    async (req: express.Request, res: express.Response) => {
        try {
            const nRequests = req.query.num;
            const fileType = JSON.stringify(req.query.fileType);

            if (!fileType) {
                return res.status(400);
            }

            // @ts-ignore
            const token = req.auth[`email`];
            const userId = await getIdFromEmail(token);
            if (!nRequests) {
                if (userId) {
                    const url = await signedUrlPut({ userId, fileType });
                    if (resResult({ result: url })) {
                        return res.sendStatus(200).json(url);
                    }
                    return res.sendStatus(400).json(url);
                }
            } else if (nRequests && userId) {
                let responses = [];

                for (let index = 0; index <= Number(nRequests); index++) {
                    const url = await signedUrlPut({ userId, fileType });
                    responses.push(url);
                }
                if (resResult({ result: responses })) {
                    return res.sendStatus(200).json(responses);
                }
                return res.sendStatus(400).json(responses);
            }

            if (userId) {
                const result = await signedUrlPut({ userId, fileType });
                if (resResult({ result })) {
                    return res.sendStatus(200).json(result);
                }
                return res.sendStatus(400).json(result);
            }

            throw new GenericNotFound('User');

            return res.status(403);
        } catch (err) {
            console.log(err);
            return res.status(500);
        }
    },
);

router.get('/');

export default router;
