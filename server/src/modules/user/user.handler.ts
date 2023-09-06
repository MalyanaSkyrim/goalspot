import { Context } from "../../trpc/context";
import { GetUserInput, UpdateUserInput } from "./user.schema";

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
      id: true,
      name: true,
      active: true,
      type: true,
      phone: true,
      email: true,
    },
  });
};

export const updateUser = ({
  ctx,
  input,
}: {
  ctx: Context;
  input: UpdateUserInput;
}) => {
  return ctx.db.user.update({ where: { id: input.id }, data: input.data });
};
