import { t } from "../../trpc";
import {
  register,
  renewToken,
  sendOtp,
  signIn,
  verifyOTP,
} from "./auth.handler";
import {
  registerSchema,
  renewTokenSchema,
  sendOTPSchema,
  signInSchema,
  verifyOTPSchema,
} from "./auth.schema";

export const authRouter = t.router({
  signIn: t.procedure.input(signInSchema).mutation(signIn),
  register: t.procedure.input(registerSchema).mutation(register),
  verifyOTP: t.procedure.input(verifyOTPSchema).mutation(verifyOTP),
  sendOtp: t.procedure.input(sendOTPSchema).mutation(sendOtp),
  renewToken: t.procedure.input(renewTokenSchema).mutation(renewToken),
});
