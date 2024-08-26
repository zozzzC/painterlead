import express from 'express';
import { MainTagSchema, MainTagSchemaId } from '../../schema/mainTag';
import validateReq from '../../helpers/zodValidationGeneric';
import { verifyJWT } from '../../helpers/jwt';
import {
    createMainTag,
    deleteMainTag,
    replaceMainTag,
    updateMainTag,
} from '../../controllers/edit/editMainTag';
import { idOnly } from '../../schema/general';
import resResult from '../../helpers/resResult';
const router = express.Router();

//TODO: can get all main tags
router.get(
    '/',
    validateReq(MainTagSchema),
    verifyJWT(),
    async (req: express.Request, res: express.Response) => {

        return res.sendStatus(200);
    },
);

//TODO: can get main tag by commission ID 
router.get(
    '/:id',
    validateReq(MainTagSchema),
    verifyJWT(),
    async (req: express.Request, res: express.Response) => {
        


        return res.sendStatus(200);
    },
);

//can make a new main tag
router.post(
    '/',
    validateReq(MainTagSchema),
    verifyJWT(),
    async (req: express.Request, res: express.Response) => {
        // @ts-ignore
        const token = req?.token;
        const body = req.body;

        const result = await createMainTag({ body, token });
        if (resResult({ result })) {
            return res.sendStatus(201);
        } else {
            return res.status(400).json(result);
        }

        return res.sendStatus(500);
    },
);


//can update (PATCH) main tag
router.patch(
    '/',
    validateReq(MainTagSchemaId),
    verifyJWT(),
    async (req: express.Request, res: express.Response) => {
        // @ts-ignore
        const token = req?.token;
        const bodyWithId = req.body;

        const result = await updateMainTag({ bodyWithId, token });
        if (resResult({ result })) {
            return res.sendStatus(201);
        } else {
            return res.status(400).json(result);
        }
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
