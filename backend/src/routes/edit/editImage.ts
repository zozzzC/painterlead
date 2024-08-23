import express from 'express';
import { verifyJWT } from '../../helpers/jwt';
const router = express.Router();
import { signedUrlPut } from '../../helpers/s3';
import { getUserId } from '../../helpers/getUserId';
import responseError from '../../helpers/error';

router.post(
    '/',
    verifyJWT(),
    async (req: express.Request, res: express.Response) => {
        const errors = new responseError();
        // const errors: { [key: string]: any } = {};
        // errors['error'] = {};
        try {
            // @ts-ignore
            const token = req?.token;
            const userId = await getUserId({ token });

            if (userId) {
                const fileType = req.query.fileType as string;
                const url = await signedUrlPut({ userId, fileType });
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
