import { z } from 'zod';

//a general id schema that just makes sure that you have an id
export const idOnly = z.object({
    id: z.number({
        required_error: 'Id is required',
    }),
});
