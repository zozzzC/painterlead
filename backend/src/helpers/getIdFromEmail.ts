import { PrismaClient, User } from '@prisma/client';
import { GenericNotFound } from './error/errorTypes';
const prisma = new PrismaClient();

export async function getIdFromEmail(token: string) {
    const email = token;

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    const userID = user?.id;

    if (!userID) {
        throw new GenericNotFound('UserID');
    }

    return userID;
}
