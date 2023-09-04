import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import { t } from ".";

const isAuth = t.middleware(({ ctx, next }) => {
  try {
    const authHeader = ctx.req.headers["authorization"];
    if (!authHeader) throw new TRPCError({ code: "UNAUTHORIZED" });
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_SECRET);
    return next({ ctx });
  } catch (err) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
});

export const authProcedure = t.procedure.use(isAuth);
