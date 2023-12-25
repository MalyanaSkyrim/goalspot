import { SurfaceTypeEnum } from "@prisma/client";
import { z } from "zod";

export const createFieldSchema = z.object({
  name: z.string(),
  maxTeamPlayers: z.coerce.number().min(5).max(11),
  hasBall: z.boolean(),
  hasShower: z.boolean(),
  hasShirts: z.boolean(),
  hasReferee: z.boolean(),
  surfaceType: z.nativeEnum(SurfaceTypeEnum),
  pricePerHour: z.coerce.number(),
});

export const addFieldImagesSchema = z.object({
  fieldId: z.string(),
  images: z.array(
    z.object({
      index: z.number(),
      base64: z.string(),
      mime: z.string(),
    })
  ),
});

export const fieldIdSchema = z.object({
  fieldId: z.string().uuid(),
});

export type CreateFieldInput = z.infer<typeof createFieldSchema>;
export type AddFieldImagesInput = z.infer<typeof addFieldImagesSchema>;
export type FieldIdInput = z.infer<typeof fieldIdSchema>;
