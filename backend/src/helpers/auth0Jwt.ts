import express, { NextFunction } from 'express';
import jwksRsa, { GetVerificationKey } from 'jwks-rsa';
import { expressjwt } from 'express-jwt';
import { auth } from 'express-oauth2-jwt-bearer';

export const checkJwt = () => {
    if (process.env.ISSUER_BASE_URL) {
        expressjwt({
            secret: jwksRsa.expressJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${process.env.ISSUER_BASE_URL}/.well-known/jwks.json`,
            }) as GetVerificationKey,
            audience: process.env.AUDIENCE,
            issuer: process.env.ISSUER_BASE_URL,
            algorithms: ['RS256'],
        });
    } else {
        throw new Error('Cannot find issuer base URL for auth0.');
    }
};

export function setToken() {
    return (
        req: express.Request,
        res: express.Response,
        next: NextFunction,
    ) => {
        //@ts-ignore
        req.token = req.auth[`email`];
    };
}
