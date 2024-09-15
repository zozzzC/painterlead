import { PrismaClient, User } from '@prisma/client';
import { getUserId } from '../../helpers/getUserId';
import responseError from '../../helpers/error';
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
    const errors = new responseError();
    try {
        const userID = id;

        const usersMainTags = await prisma.mainTag.findMany({
            where: {
                artistId: userID,
            },
        });

        if (!usersMainTags) {
            errors.createNewError({
                errorType: 'tag',
                errorMessage: 'Tags were not found for the given user.',
            });
            return errors.allErrors;
        }

        return usersMainTags;
    } catch (err: any) {
        errors.createNewError({
            errorType: 'tag',
            errorMessage: err,
        });
        return errors.allErrors;
    }
}

export async function getMainTagByCommissionId({
    commissionId,
}: {
    commissionId: string;
}) {
    const errors = new responseError();
    try {
        const commissionMainTags =
            await prisma.artistGeneralCommission.findFirst({
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
            errors.createNewError({
                errorType: 'tag',
                errorMessage: 'Tag was not found for the given commission ID.',
            });
            return errors.allErrors;
        }
        return mainTag;
    } catch (err : any) {
        errors.createNewError({
            errorType: 'tag',
            errorMessage: err,
        });
        return errors.allErrors;
    }
}

export async function createMainTag({
    body,
    token,
}: {
    body: Body;
    token: string;
}): Promise<Object | undefined> {
    const errors = new responseError();
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: token,
            },
        });

        console.log(user);

        const userId = user?.id;

        const userMainTagExists = await prisma.mainTag.findFirst({
            where: {
                artistId: userId,
                name: body.name,
            },
        });
        console.log(userMainTagExists);

        if (userMainTagExists) {
            errors.createNewError({
                errorType: 'tag',
                errorMessage: 'This tag already exists',
            });
            return errors;
        }

        if (userId) {
            await prisma.mainTag.create({
                data: {
                    name: body.name,
                    artistId: userId,
                },
            });
        }

        return {};
    } catch (err : any) {
        errors.createNewError({
            errorType: 'tag',
            errorMessage: err,
        });
        return errors;
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
    const errors = new responseError();
    const mainTagId = bodyWithId.id;

    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });

    if (!user) {
        errors.createNewError({
            errorType: 'tag',
            errorMessage: 'User not found.',
        });
        return errors;
    }

    const userId = user.id;

    try {
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
    } catch (err) {
        errors.createNewError({
            errorType: 'tag',
            errorMessage: 'You are not authorised to change this resource',
        });
        return errors;
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
