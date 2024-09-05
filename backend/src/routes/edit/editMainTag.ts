import express from 'express';
import {
    MainTagSchema,
    MainTagSchemaCommissionId,
    MainTagSchemaId,
} from '../../schema/mainTag';
import validateReq from '../../helpers/zodValidationGeneric';
import { verifyJWT } from '../../helpers/jwt';
import {
    createMainTag,
    deleteMainTag,
    getMainTag,
    getMainTagByCommissionId,
    updateMainTag,
} from '../../controllers/edit/editMainTag';
import { idOnly } from '../../schema/general';
import resResult from '../../helpers/resResult';
import { checkJwt } from '../../helpers/auth0Jwt';
import { getIdFromEmail } from '../../helpers/getIdFromEmail';
const router = express.Router();

//TODO: can get all main tags that a user has (when logged in)
router.get(
    '/',
    validateReq(MainTagSchema),
    checkJwt,
    async (req: express.Request, res: express.Response) => {
        // @ts-ignore
        const token = req.auth[`email`];
        const id = await getIdFromEmail(token);

        if (id) {
            const result = await getMainTag({ id });
            if (resResult({ result })) {
                return res.sendStatus(201);
            } else {
                return res.status(400).json(result);
            }
        }

        return res.sendStatus(500);
    },
);

//TODO: can get main tag by commission ID
router.get(
    '/:id',
    validateReq(MainTagSchemaCommissionId),
    async (req: express.Request, res: express.Response) => {
        const commissionId = req.params.id;
        const result = await getMainTagByCommissionId({ commissionId });
        if (resResult({ result })) {
            return res.status(201).json(result);
        } else {
            return res.status(400).json(result);
        }
    },
);

//can make a new main tag
router.post(
    '/',
    validateReq(MainTagSchema),
    checkJwt,
    async (req: express.Request, res: express.Response) => {
        // @ts-ignore
        const token = req.auth[`email`];
        const body = req.body;

        const result = await createMainTag({ body, token });
        if (resResult({ result })) {
            return res.sendStatus(201);
        } else {
            return res.status(400).json(result);
        }
    },
);

//can update (PATCH) main tag
router.patch(
    '/',
    validateReq(MainTagSchemaId),
    checkJwt,
    async (req: express.Request, res: express.Response) => {
        // @ts-ignore
        const token = req.auth[`email`];
        const id = await getIdFromEmail(token);
        const bodyWithId = req.body;
        if (id) {
            const result = await updateMainTag({ bodyWithId, id });
            if (resResult({ result })) {
                return res.sendStatus(201);
            } else {
                return res.status(400).json(result);
            }
        }
        return res.sendStatus(500);
    },
);

//can delete main tag
router.delete(
    '/',
    validateReq(idOnly),
    verifyJWT(),
    async (req: express.Request, res: express.Response) => {
        // @ts-ignore
        const token = req?.token;
        const bodyWithId = req.body;

        const result = await deleteMainTag({ bodyWithId, token });

        if (resResult({ result })) {
            return res.sendStatus(200);
        } else {
            return res.status(400).json(result);
        }
    },
);

export default router;
