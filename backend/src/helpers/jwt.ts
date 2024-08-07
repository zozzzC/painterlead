import jwt from 'jsonwebtoken';
import express, { NextFunction } from 'express';
import dotenv from 'dotenv';
const router = express.Router();

export function signJWT({ username }: { username: string }) {
    //@ts-ignore
    const jwtHash: jwt.Secret = process.env.JWT;
    return jwt.sign({ username: username }, jwtHash, { expiresIn: '7d' });
}

export function verifyJWT() {
    return (
        req: express.Request,
        res: express.Response,
        next: NextFunction,
    ) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) return res.sendStatus(401);

        //@ts-ignore
        const jwtHash: jwt.Secret = process.env.JWT;

        jwt.verify(token, jwtHash, (err, decoded) => {
            if (err) {
                return res
                    .status(403)
                    .json({ message: 'Authentication failed.' });
            }
            // @ts-ignore
            req.token = decoded;
            next();
        });
    };
}

export function unsignJWT({ token }: { token: string }) {
    return (
        req: express.Request,
        res: express.Response,
        next: NextFunction,
    ) => {};
}
