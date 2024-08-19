import { z } from 'zod';

export const MainTagSchema = z.object({
    name: z.string({
        required_error: 'Main Tag name is required',
    }),
});

export const MainTagSchemaId = MainTagSchema.extend({
    id: z.number({
        required_error: 'Main Tag Id is required',
    }),
});
