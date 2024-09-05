import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getUserId({ token }: { token: any }) {

    const findUserId = await prisma.user.findUnique({
        where: {
            email: token,
        },
    });

    const id = findUserId?.id;

    if (id) {
        return id;
    }

    return null;
}
