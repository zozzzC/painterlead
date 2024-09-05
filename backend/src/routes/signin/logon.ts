// import express from 'express';
// import { LoginUserSchema } from '../../schema/user';
// import validateReq from '../../helpers/zodValidationGeneric';
// import loginUser from '../../controllers/signin/login';
// import { PrismaClient } from '@prisma/client';
// import { signJWT } from '../../helpers/jwt';
// const router = express.Router();
// const prisma = new PrismaClient();

// router.post(
//     '/',
//     validateReq(LoginUserSchema),
//     async (req: express.Request, res: express.Response) => {
//         try {
//             const { email, password } = req.body;
//             const user = await loginUser({ email, password });
//             if (Object.keys(user).length == 0) {
//                 const findEmail = await prisma.user.findUnique({
//                     where: {
//                         email: email,
//                     },
//                 });
//                 //@ts-ignore
//                 const username = findEmail.username;
//                 const token = signJWT({ username });
//                 res.setHeader('authorization', token);
//                 res.status(201).json(token);
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
