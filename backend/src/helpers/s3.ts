import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { PrismaClient, Prisma } from '@prisma/client';
import crypto from 'crypto';
import { FileTypeError } from './error/errorTypes';

const prisma = new PrismaClient();
const region = 'ap-southeast-2';
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.BUCKET_NAME;

//@ts-ignore
const s3Client = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: region,
});

async function associateUserImage({
    userId,
    url,
    key,
}: {
    userId: string;
    url: string | URL;
    key: string;
}) {
    await prisma.artistImages.create({
        data: {
            artistId: userId,
            s3Url: JSON.stringify(url),
            s3Key: key,
        },
    });
}

export async function signedUrlPut({
    userId,
    fileType,
    fileSize,
}: {
    userId: string;
    fileType: string;
    fileSize: string;
}) {
    const key = crypto.randomBytes(16).toString('hex');

    if (fileType == 'png' || fileType == 'jpeg') {
        const params = {
            Bucket: bucketName,
            Key: `uploads/${userId}/${key.toString()}`,
            ContentLength: parseInt(fileSize),
            Region: region,
            ContentType: `image/${fileType}`,
        };

        const command = new PutObjectCommand(params);
        const url = await getSignedUrl(s3Client, command, {
            expiresIn: 5000,
        });
        await associateUserImage({ userId, url, key });
        const keyAndUrl = [key, url];
        return keyAndUrl;
    }
    throw new FileTypeError(['PNG', 'JPEG']);
}

async function signedUrlGet({ userId }: { userId: string }) {
    const key = crypto.randomBytes(16).toString();
    const params = {
        Bucket: bucketName,
        Key: userId,
        Region: region,
    };

    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3Client, command, { expiresIn: 5000 });
    return url;
}
