import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getUserId({ email }: { email : string }) {

    const findUserId = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    const id = findUserId?.id;

    if (id) {
        return id;
    }

    return null;
}
