import aws from 'aws-sdk';
import dotenv from 'dotenv';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { PrismaClient, Prisma } from '@prisma/client';
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

async function createDbKey({ userId }: { userId: number }) {
    const image = await prisma.artistImages.create({
        data: {
            artistId: userId,
        },
    });
    return image.id;
}

export async function signedUrlPut({userId, fileType} : {userId: number, fileType: string}) { 
    try {
        const key = await createDbKey({ userId });
        const params = {
            Bucket: bucketName,
            Key: key.toString(),
            Region: region,
            ContentType: `image/${fileType}`
        };

        const command = new PutObjectCommand(params);
        const url = await getSignedUrl(s3Client, command, { expiresIn: 5000 });
        return url;
    } catch (err) {
        return err;
    }
}

async function signedUrlGet({ userId }: { userId: number }) {
    try {
        const key = await createDbKey({ userId });
        const params = {
            Bucket: bucketName,
            Key: key.toString(),
            Region: region,
        };

        const command = new GetObjectCommand(params);
        const url = await getSignedUrl(s3Client, command, { expiresIn: 5000 });
        return url;
    } catch (err) {
        return err;
    }
}
