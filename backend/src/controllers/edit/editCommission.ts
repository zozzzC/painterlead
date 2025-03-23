import { PrismaClient } from '@prisma/client';
import { commissionDetails } from '../../types/commissionDetails';
import { ExistsError } from '../../helpers/error/errorTypes';
const prisma = new PrismaClient();

export async function getCommissionByArtistId({
    userId,
}: {
    userId: string;
}): Promise<Array<commissionDetails>> {
    const commissions: Array<commissionDetails> =
        await prisma.artistGeneralCommission.findMany({
            where: {
                artistId: userId,
            },
        });

    return commissions;
}

export async function getCommissionById({
    commissionId,
}: {
    commissionId: string;
}): Promise<Array<commissionDetails>> {
    const commissions: Array<commissionDetails> =
        await prisma.artistGeneralCommission.findMany({
            where: {
                id: commissionId,
            },
        });

    return commissions;
}

export async function createCommission({
    userId,
    commissionDetails,
}: {
    userId: string;
    commissionDetails: commissionDetails;
}) {
    const { name } = commissionDetails;

    const findExistingCommission =
        await prisma.artistGeneralCommission.findUnique({
            where: {
                id: userId,
                name: name,
            },
        });

    if (findExistingCommission) {
        throw new ExistsError(name);
    }

    await prisma.artistGeneralCommission.create({
        data: {
            ...commissionDetails,
            artistId: userId,
        },
    });

}

export function putCommission() {

}

export function patchCommission() {
    
}

export function deleteCommission() {
    
}
