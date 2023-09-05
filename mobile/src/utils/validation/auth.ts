import {z} from 'zod';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signUpSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  phone: z.string(),
  password: z.string().min(8),
});

export type SignInData = z.infer<typeof signInSchema>;
export type SignUpData = z.infer<typeof signUpSchema>;
