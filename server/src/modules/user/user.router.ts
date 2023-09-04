import { t } from "../../trpc";
import { authProcedure } from "../../trpc/procedures";
import { getUser, updateUser } from "./user.handler";
import { getUserSchema, updateUserSchema } from "./user.schema";

export const userRouter = t.router({
  getUser: authProcedure.input(getUserSchema).query(getUser),
  updateUser: authProcedure.input(updateUserSchema).mutation(updateUser),
});
