import express, { NextFunction } from 'express';
import {
    ExistsError,
    FileTypeError,
    GenericNotFound,
    IdNotFoundError,
    NotFoundForGivenItem,
} from '../helpers/error/errorTypes';
import { ZodError } from 'zod';

export const errorHandler = (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: NextFunction,
) => {
    if (err instanceof FileTypeError) {
        return res.status(400).send(err.getMessage());
    }

    if (err instanceof ZodError) {
        return res.status(400).send(err.flatten().fieldErrors);
    }

    if (err instanceof IdNotFoundError) {
        return res.status(404).send(err.getMessage());
    }

    if (err instanceof ExistsError) {
        return res.status(400).send(err.getMessage());
    }

    if (err instanceof GenericNotFound) {
        return res.status(404).send(err.getMessage());
    }

    if (err instanceof NotFoundForGivenItem) {
        return res.status(404).send(err.getMessage());
    }

    return res.status(500).send(err.message);
};
