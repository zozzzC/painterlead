import { z } from 'zod';

export const UserSchema = z
    .object({
        email: z
            .string({
                required_error: 'Email is required',
            })
            .email(),
    })
    .required();

type User = z.infer<typeof UserSchema>;

export const LoginUserSchema = UserSchema;
