import {parsePhoneNumber} from 'libphonenumber-js';
import {z} from 'zod';

export const updatePhoneNumberSchema = z.object({
  phone: z
    .string()
    .transform(val => parsePhoneNumber(val))
    .refine(arg => !arg || arg.isValid(), 'Phone number is invalid')
    .transform(val => val!.number.toString()),
});
export type UpdatePhoneNumberData = z.infer<typeof updatePhoneNumberSchema>;
