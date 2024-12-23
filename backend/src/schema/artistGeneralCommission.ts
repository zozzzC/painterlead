import { array, z } from 'zod';
import { Status } from '@prisma/client';

export const ArtistGeneralCommissionSchema = z.object({
    name: z.string({
        required_error: 'Commission name is required',
    }),
    artistId: z.string({
        required_error: 'ArtistId is required',
    }),
    blurb: z.string().max(100).optional(),
    description: z.string().max(500).optional(),
    mainTagId: z.string({
        required_error: 'MainTagId is required',
    }),
    optionalTagId: z.string().optional(),
    status: z.nativeEnum(Status),
});
