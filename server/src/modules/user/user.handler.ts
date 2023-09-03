import { Context } from "../../trpc/context";
import { GetUserInput } from "./user.schema";

export const getUser = ({
  ctx,
  input,
}: {
  ctx: Context;
  input: GetUserInput;
}) => {
  return ctx.db.user.findUnique({
    where: { id: input.id },
    select: {
      name: true,
      active: true,
      type: true,
      phone: true,
      email: true,
    },
  });
};
