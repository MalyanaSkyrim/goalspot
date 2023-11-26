import { t } from "../../trpc";
import { authProcedure } from "../../trpc/procedures";
import { getUser, updateOwnUser, updateUser } from "./user.handler";
import {
  getUserSchema,
  updateOwnUserSchema,
  updateUserSchema,
} from "./user.schema";

const userRouter = t.router({
  getUser: authProcedure.input(getUserSchema).query(getUser),
  updateUser: authProcedure.input(updateUserSchema).mutation(updateUser),
  updateOwnUser: authProcedure
    .input(updateOwnUserSchema)
    .mutation(updateOwnUser),
});

export default userRouter;
