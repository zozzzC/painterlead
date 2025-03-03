import { PrismaClient, User } from '@prisma/client';
import {
    ExistsError,
    GenericNotFound,
    NotFoundForGivenItem,
} from '../../helpers/error/errorTypes';
import { getIdFromEmail } from '../../helpers/getIdFromEmail';
const prisma = new PrismaClient();

type Body = {
    name: string;
};

type BodyWithId = {
    id: string;
    name: string;
};

type BodyWithUserId = {
    id: string;
};

export async function getMainTag({ id }: { id: string }) {
    const userID = id;

    const usersMainTags = await prisma.mainTag.findMany({
        where: {
            artistId: userID,
        },
    });

    if (!usersMainTags) {
        throw new NotFoundForGivenItem('Main Tag', 'user');
    }

    return usersMainTags;
}

export async function getMainTagByCommissionId({
    commissionId,
}: {
    commissionId: string;
}) {
    const commissionMainTags = await prisma.artistGeneralCommission.findFirst({
        where: {
            id: commissionId,
        },
    });
    const mainTag = await prisma.mainTag.findFirst({
        where: {
            id: commissionMainTags?.mainTagId,
        },
    });

    if (!mainTag) {
        throw new NotFoundForGivenItem('Main Tag', 'commission');
    }
    return mainTag;
}

export async function createMainTag({
    body,
    email,
}: {
    body: Body;
    email: string;
}) {
    const userId = await getIdFromEmail(email);

    const userMainTagExists = await prisma.mainTag.findFirst({
        where: {
            artistId: userId,
            name: body.name,
        },
    });

    if (userMainTagExists) {
        throw new ExistsError('Main Tag');
    }

    console.log(body.name);
    console.log(userId);

    if (userId) {
        await prisma.mainTag.create({
            data: {
                name: body.name,
                artistId: userId,
            },
        });
    }
}

//patch
export async function updateMainTag({
    bodyWithId,
    id,
}: {
    bodyWithId: BodyWithId;
    id: string;
}): Promise<Object | undefined> {
    const mainTagId = bodyWithId.id;

    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });

    if (!user) {
        throw new GenericNotFound('User');
    }

    const userId = user.id;

    if (userId) {
        await prisma.mainTag.update({
            where: {
                id: mainTagId,
                artistId: userId,
            },
            data: {
                ...bodyWithId,
            },
        });
    }

    return {};
}

export async function deleteMainTag({
    bodyWithId,
    email,
}: {
    bodyWithId: BodyWithId;
    email: string;
}) {
    const userId = await getIdFromEmail(email);

    if (userId) {
        await prisma.mainTag.delete({
            where: {
                id: bodyWithId.id,
            },
        });

        return {};
    }

    if (!userId) {
        throw new GenericNotFound('User');
    }
}
