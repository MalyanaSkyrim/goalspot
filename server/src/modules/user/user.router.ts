import { t } from "../../trpc";
import { authProcedure } from "../../trpc/procedures";
import { getUser } from "./user.handler";
import { getUserSchema } from "./user.schema";

export const userRouter = t.router({
  getUser: authProcedure.input(getUserSchema).query(getUser),
});
