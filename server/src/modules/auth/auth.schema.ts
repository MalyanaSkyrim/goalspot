import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string(),
});

export const verifyOTPSchema = z.object({
  phone: z.string(),
  code: z.string().min(6),
});

export const renewTokenSchema = z.object({
  refreshToken: z.string(),
});

export type SignInInput = z.infer<typeof signInSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type VerifyOTPInput = z.infer<typeof verifyOTPSchema>;
export type RenewTokenSchemaInput = z.infer<typeof renewTokenSchema>;
