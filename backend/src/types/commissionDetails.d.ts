import { Status } from '@prisma/client';
export type commissionDetails = {
    name: string;
    status: Status;
    blurb: string | null;
    description: string | null;
    optionalTagId: string | null;
    mainTagId: string;
};
