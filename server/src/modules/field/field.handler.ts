import { Context } from "../../trpc/context";
import { CreateFieldInput } from "./field.schema";

export const createField = ({
  ctx,
  input,
}: {
  input: CreateFieldInput;
  ctx: Context;
}) => {
  const userId = ctx.req.userId;
  return ctx.db.pitch.create({ data: { ...input, userId } });
};
