import { PrismaClient, User } from '@prisma/client';
import { getUserId } from '../../helpers/getUserId';
import responseError from '../../helpers/error';
import {
    ExistsError,
    GenericNotFound,
    NotFoundForGivenItem,
} from '../../helpers/error/errorTypes';
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
    token,
}: {
    body: Body;
    token: string;
}) {
    const user = await prisma.user.findUnique({
        where: {
            email: token,
        },
    });

    const userId = user?.id;

    const userMainTagExists = await prisma.mainTag.findFirst({
        where: {
            artistId: userId,
            name: body.name,
        },
    });
    console.log(userMainTagExists);

    if (userMainTagExists) {
        throw new ExistsError('Main Tag');
    }

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
    token,
}: {
    bodyWithId: BodyWithId;
    token: string;
}) {
    const errors = new responseError();
    try {
        const userId = await getUserId({ token });
        if (userId) {
            await prisma.mainTag.delete({
                where: {
                    id: bodyWithId.id,
                },
            });

            return {};
        }
        errors.createNewError({
            errorType: 'tag',
            errorMessage: 'You are not authorized to change this resource',
        });
        return errors;
    } catch (err) {
        errors.createNewError({
            errorType: 'tag',
            errorMessage: 'Could not make tag',
        });
        return errors;
    }
}
