// import express from 'express';
// import registerUser from '../../controllers/signin/register';
// import { register } from 'module';
// import { UserSchema } from '../../schema/user';
// import validateReq from '../../helpers/zodValidationGeneric';
// import { signJWT } from '../../helpers/jwt';
// const router = express.Router();

// router.post(
//     '/',
//     validateReq(UserSchema),
//     async (req: express.Request, res: express.Response) => {
//         try {
//             const { username, password, email } = req.body;
//             const token = signJWT({ username });
//             const user = await registerUser({ username, password, email });
//             if (Object.keys(user).length == 0) {
//                 res.status(201).json({ token });
//             } else {
//                 res.status(400).json(user);
//             }
//         } catch (err) {
//             console.log(err);
//             res.status(500).send(err);
//         }
//     },
// );

// export default router;
