import { PrismaClient } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

export function createContext({ req, res }: CreateFastifyContextOptions) {
  const db = new PrismaClient();
  return { req, res, db };
}

export type Context = inferAsyncReturnType<typeof createContext>;
