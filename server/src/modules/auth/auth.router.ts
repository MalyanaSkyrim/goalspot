import { t } from "../../trpc";
import { register, signIn, verifyOTP } from "./auth.handler";
import { registerSchema, signInSchema, verifyOTPSchema } from "./auth.schema";

export const authRouter = t.router({
  signIn: t.procedure.input(signInSchema).mutation(signIn),
  register: t.procedure.input(registerSchema).mutation(register),
  verifyOTP: t.procedure.input(verifyOTPSchema).mutation(verifyOTP),
});
