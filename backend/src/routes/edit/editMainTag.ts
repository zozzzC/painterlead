import express from 'express';
import {
    MainTagSchema,
    MainTagSchemaCommissionId,
    MainTagSchemaId,
} from '../../schema/mainTag';
import validateReq from '../../middlewares/zodValidationGeneric';
import {
    createMainTag,
    deleteMainTag,
    getMainTag,
    getMainTagByCommissionId,
    updateMainTag,
} from '../../controllers/edit/editMainTag';
import { idOnly } from '../../schema/general';
import resResultIsError from '../../helpers/resResult';
import { checkJwt } from '../../middlewares/auth0Jwt';
import { getIdFromEmail } from '../../helpers/getIdFromEmail';
const router = express.Router();

//TODO: can get all main tags that a user has (when logged in)
router.get(
    '/',
    checkJwt,
    async (req: express.Request, res: express.Response) => {
        // @ts-ignore
        const token = req.auth[`email`];
        const id = await getIdFromEmail(token);

        if (id) {
            const result = await getMainTag({ id });
            return res.status(200).json(result);
        }
    },
);

//TODO: can get main tag by commission ID
router.get(
    '/:id',
    validateReq(MainTagSchemaCommissionId),
    async (req: express.Request, res: express.Response) => {
        const commissionId = req.params.id;
        const result = await getMainTagByCommissionId({ commissionId });
        return res.status(201).json(result);
    },
);

//can make a new main tag
router.post(
    '/',
    validateReq(MainTagSchema),
    checkJwt,
    async (req: express.Request, res: express.Response) => {
        // @ts-ignore
        const email = req.auth[`email`];
        const body = req.body;
        await createMainTag({ body, email });
        return res.sendStatus(201);
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
            return res.status(200);
        }
    },
);

//can delete main tag
router.delete(
    '/',
    validateReq(idOnly),
    checkJwt,
    async (req: express.Request, res: express.Response) => {
        // @ts-ignore
        const email = req?.auth?.email;
        const bodyWithId = req.body;
        const result = await deleteMainTag({ bodyWithId, email });
        return res.sendStatus(200);
    },
);

export default router;
