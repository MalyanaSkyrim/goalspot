import { UserTypeEnum } from "@prisma/client";
import { z } from "zod";

export const getUserSchema = z.object({ id: z.string().uuid() });
export const updateUserSchema = z.object({
  id: z.string().uuid(),
  data: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    type: z.nativeEnum(UserTypeEnum),
  }),
});

export type GetUserInput = z.infer<typeof getUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
