import express, { NextFunction } from 'express';
import jwksRsa, { GetVerificationKey } from 'jwks-rsa';
import { expressjwt } from 'express-jwt';
import { auth } from 'express-oauth2-jwt-bearer';

export const checkJwt = expressjwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://dev-ta8lsqn8atlh8nau.us.auth0.com/.well-known/jwks.json`,
    }) as GetVerificationKey,
    audience: 'https://painterlead.com',
    issuer: 'https://dev-ta8lsqn8atlh8nau.us.auth0.com/',
    algorithms: ['RS256'],
});
