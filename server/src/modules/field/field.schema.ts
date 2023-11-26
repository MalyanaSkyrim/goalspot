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

export type CreateFieldInput = z.infer<typeof createFieldSchema>;
