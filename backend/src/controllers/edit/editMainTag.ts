import { PrismaClient, User } from '@prisma/client';
import { getUserId } from '../../helpers/getUserId';
import responseError from '../../helpers/error';
const prisma = new PrismaClient();

type Token = {
    username: string;
};

type Body = {
    name: string;
};

type BodyWithId = {
    id: string;
    name: string;
};

export async function createMainTag({
    body,
    token,
}: {
    body: Body;
    token: Token;
}): Promise<Object | undefined> {
    const errors = new responseError();
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: token.username,
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
    } catch (err) {
        console.log(err);
        errors.createNewError({
            errorType: 'tag',
            errorMessage: 'Server error',
        });
        return errors;
    }
}

//patch
export async function updateMainTag({
    bodyWithId,
    token,
}: {
    bodyWithId: BodyWithId;
    token: Token;
}): Promise<Object | undefined> {
    const errors = new responseError();
    const mainTagId = bodyWithId.id;

    const user = await prisma.user.findUnique({
        where: {
            username: token.username,
        },
    });

    if (!user) {
        errors.createNewError({
            errorType: 'tag',
            errorMessage: 'User not found.',
        });
        return errors;
    }
    const userId = user?.id;

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

export async function replaceMainTag() {}

export async function deleteMainTag({
    bodyWithId,
    token,
}: {
    bodyWithId: BodyWithId;
    token: Token;
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
