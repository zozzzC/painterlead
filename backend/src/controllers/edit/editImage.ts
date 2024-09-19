import { signedUrlPut } from '../../helpers/s3';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function uploadImage({
    userId,
    fileType,
}: {
    userId: string;
    fileType: string;
}) {
    try {
        const url = await signedUrlPut({ userId: userId, fileType: fileType });
        return url;
    } catch (err) {
        return err;
    }
}

export async function getImagesByUser({ userId }: { userId: string }) {
    try {
        const ImageUrls = await prisma.artistImages.findMany({
            where: {
                artistId: userId,
            },
        });
    } catch (err) {
        return err;
    }
}

export async function getImagesByCommissionId({ commissionId } : {commissionId: string})  {
    
}

export async function getImage({
    userId,
    imageId,
}: {
    userId: string;
    imageId: number;
}) {}

export async function deleteImage({ userId }: { userId: string }) {}
