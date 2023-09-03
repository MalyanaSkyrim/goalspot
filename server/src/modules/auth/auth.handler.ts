import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Context } from "../../trpc/context";
import { RegisterInput, SignInInput } from "./auth.schema";

export const signIn = async ({
  ctx,
  input,
}: {
  input: SignInInput;
  ctx: Context;
}) => {
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

  const token = jwt.sign(
    { name: user.name, email: user.email, type: user.type },
    process.env.SECRET,
    { expiresIn: "1d" }
  );

  return { token };
};

export const register = async ({
  ctx,
  input,
}: {
  input: RegisterInput;
  ctx: Context;
}) => {
  const hashedPassword = await bcrypt.hash(input.password, 10);
  console.log("### sky", { hashedPassword });
  return ctx.db.user
    .create({
      data: { ...input, password: hashedPassword },
      select: {
        name: true,
        active: true,
        type: true,
        phone: true,
        email: true,
      },
    })
    .catch((err) => console.log(err));
};
