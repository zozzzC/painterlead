import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import responseError from '../../helpers/error';
const prisma = new PrismaClient();

export default async function registerUser({
    username,
    email,
    password,
}: {
    username: string;
    email: string;
    password: string;
}) {
    try {
        const errors = new responseError();

        const findEmail = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (findEmail) {
            errors.createNewError({errorType: 'email', errorMessage: 'That email has already been registered.'})
        }

        const findUsername = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        if (findUsername) {
            errors.createNewError({errorType: 'username', errorMessage: 'That username has already been registered.'})
        }

        if (!errors.isNull()) {
            return errors;
        }

        const hash = await bcrypt.hash(password, 15);

        await prisma.user.create({
            data: {
                email: email,
                username: username,
                password: hash,
            },
        });

        return {};
    } catch (err: any) {
        throw new Error(err);
    }
}
