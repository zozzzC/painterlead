import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';
export const s3Client = new S3Client({ region: 'ap-southeast-2' });
import { auth } from 'express-oauth2-jwt-bearer';
import jwtAuthz from 'express-jwt-authz';
import { checkJwt } from './middlewares/auth0Jwt';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

dotenv.config({
    path: path.resolve(__dirname, '../.env'),
});

const router = require('./routes/router');
const corsOptions = {
    origin: 'http://localhost:3000', //IMPORTANT: change on prod
    credentials: true,
};

app.use(express.static('public'));
app.use(cors(corsOptions));
app.use('/', router);
app.use(errorHandler);

const port = 4321;

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

app.get(
    '/test',
    checkJwt,
    async (req: express.Request, res: express.Response) => {
        //@ts-ignore
        console.log(req.auth[`email`]); //this is the email that is associated with the access token
        console.log(req.headers['authorization']?.split(' ')[1]); //this is the access token itself
        res.sendStatus(200);
    },
);
