import { PrismaClient, User } from '@prisma/client';
import error from '../../helpers/error';
import { getUserId } from '../../helpers/getUserId';
const prisma = new PrismaClient();

type Token = {
    username: string;
};

type Body = {
    name: string;
};

type BodyWithId = {
    id: number;
    name: string;
};

export async function createMainTag({
    body,
    token,
}: {
    body: Body;
    token: Token;
}): Promise<Object | undefined> {
    const errors: { [key: string]: any } = {};
    errors['error'] = {};
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
            (errors.error.tag = []),
                (errors.error.tag[0] = 'This tag already exists');
            return errors;
        }

        await prisma.mainTag.create({
            data: {
                name: body.name,
                //@ts-ignore
                artistId: parseInt(userId),
            },
        });

        return {};
    } catch (err) {
        console.log(err);
        (errors.error.tag = []), (errors.error.tag[0] = 'Server error.');
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
    const errors: { [key: string]: any } = {};
    errors['error'] = {};
    const mainTagId = bodyWithId.id;

    const user = await prisma.user.findUnique({
        where: {
            username: token.username,
        },
    });

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
        errors.error.tag = [];
        errors.error.tag[0] = 'You are not authorized to change this resource.';
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
    const errors: { [key: string]: any } = {};
    errors['error'] = {};
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

        errors.error.tag = [];
        errors.error.tag[0] = 'You are not authorized to change this resource.';
        return errors;
    } catch (err) {
        errors.error.tag = [];
        errors.error.tag[0] = 'Could not find the given tag.';
        return errors;
    }
}
