import parsePhoneNumber from 'libphonenumber-js';
import {z} from 'zod';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signUpSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z
    .string()
    .transform(val => parsePhoneNumber(val))
    .refine(arg => !arg || arg.isValid(), 'Phone number is invalid')
    .transform(val => val!.number.toString()),
  password: z.string().min(8),
});

export type SignInData = z.infer<typeof signInSchema>;
export type SignUpData = z.infer<typeof signUpSchema>;
