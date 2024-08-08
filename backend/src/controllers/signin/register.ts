import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
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
        const errors: { [key: string]: any } = {};
        errors['error'] = {};

        const findEmail = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (findEmail) {
            errors.error.email = [];
            errors.error.email[0] = 'That email has already been registered.';
        }

        const findUsername = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        if (findUsername) {
            errors.error.username = [];
            errors.error.username[0] =
                'That username has already been registered.';
        }

        if (JSON.stringify(errors.error) !== '{}') {
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
