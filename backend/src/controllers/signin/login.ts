import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import responseError from '../../helpers/error';
const prisma = new PrismaClient();

export default async function loginUser({
    email,
    password,
}: {
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

        if (findEmail === null) {
            errors.createNewError({
                errorType: 'email',
                errorMessage: 'Email has not been registered.',
            });
            if (!errors.isNull()) {
                return errors;
            }
        }

        //NOTE: this has to be an await since if we used the default
        //bcrypt compare implementation, then it would not wait for it to execute and would
        //execute other code before it since bcrypt.compare was async and did not return a promise
        //@ts-ignore
        const match = await bcrypt.compare(password, findEmail.password);
        if (!match) {
            errors.createNewError({
                errorType: 'password',
                errorMessage: 'Passwords do not match.',
            });
            return errors;
        }
        return {};
    } catch (err: any) {
        throw new Error(err.message);
    }
}
