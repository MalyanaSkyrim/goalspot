import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "@prisma/client";
import { sendOTPCode, verifyOTPCode } from "../../services/twilio";
import { Context } from "../../trpc/context";
import {
  RegisterInput,
  RenewTokenSchemaInput,
  SendOtpInput,
  SignInInput,
  VerifyOTPInput,
} from "./auth.schema";

export const signIn = async ({
  ctx,
  input,
}: {
  input: SignInInput;
  ctx: Context;
}): Promise<{
  user: Omit<User, "password">;
  accessToken: string;
  refreshToken: string;
}> => {
  const { email, password } = input;
  const user = await ctx.db.user.findUnique({ where: { email } });
  if (!user)
    throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });

  const isPasswordValid = bcrypt.compare(password, user.password);

  if (!isPasswordValid)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid credentials",
    });

  const accessToken = jwt.sign(
    { name: user.name, email: user.email, type: user.type },
    process.env.ACCESS_SECRET,
    { expiresIn: "1d" }
  );

  const refreshToken = jwt.sign(
    { name: user.name, email: user.email, type: user.type },
    process.env.REFRESH_SECRET
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
      active: user.active,
      phone: user.phone,
    },
    accessToken,
    refreshToken,
  };
};

export const register = async ({
  ctx,
  input,
}: {
  input: RegisterInput;
  ctx: Context;
}): Promise<{
  accessToken: string;
  refreshToken: string;
  user: Omit<User, "password">;
}> => {
  const hashedPassword = await bcrypt.hash(input.password, 10);
  // await sendOTPCode(input.phone);
  const user = await ctx.db.user.create({
    data: { ...input, password: hashedPassword },
    select: {
      id: true,
      name: true,
      active: true,
      type: true,
      phone: true,
      email: true,
    },
  });

  const accessToken = jwt.sign(
    { name: user.name, email: user.email, type: user.type },
    process.env.ACCESS_SECRET,
    { expiresIn: "1d" }
  );

  const refreshToken = jwt.sign(
    { name: user.name, email: user.email, type: user.type },
    process.env.REFRESH_SECRET
  );

  return { accessToken, refreshToken, user };
};

export const verifyOTP = ({
  input,
  ctx,
}: {
  input: VerifyOTPInput;
  ctx: Context;
}) => {
  const { id, phone, code } = input;
  return verifyOTPCode(phone, code).then(async (res) => {
    await ctx.db.user.update({ where: { id }, data: { active: true } });
    return res;
  });
};

export const renewToken = ({
  input,
}: {
  input: RenewTokenSchemaInput;
  ctx: Context;
}): { accessToken: string } => {
  try {
    const decoded = jwt.verify(input.refreshToken, process.env.REFRESH_SECRET);
    const accessToken = jwt.sign(decoded, process.env.ACCESS_SECRET, {
      expiresIn: "1d",
    });
    return { accessToken };
  } catch (err) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "refresh token is invalid",
    });
  }
};

export const sendOtp = ({ input }: { input: SendOtpInput }) => {
  return sendOTPCode(input.phone);
};
