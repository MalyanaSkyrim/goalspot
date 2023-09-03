import { t } from "../../trpc";
import { register, signIn } from "./auth.handler";
import { registerSchema, signInSchema } from "./auth.schema";

export const authRouter = t.router({
  signIn: t.procedure.input(signInSchema).mutation(signIn),
  register: t.procedure.input(registerSchema).mutation(register),
});
