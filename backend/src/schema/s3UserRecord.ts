import { z } from 'zod';

export const S3UserRecordSchema = z.object({
    userId: z.string({
        required_error: 'User Id is required',
    }),
    url: z.string({
        required_error: 'URL is required',
    }),
});
