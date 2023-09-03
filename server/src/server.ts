import autoload from "@fastify/autoload";
import Fastify, { FastifyInstance, FastifyServerOptions } from "fastify";
import { join } from "path";

import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";

import { appRouter } from "./modules";
import { createContext } from "./trpc/context";

/**
 * Builder to create a Fastify server instance.
 * @param opts Fastify server options.
 * @see https://www.fastify.io/docs/latest/Reference/Server/
 */
export const createServer = (opts: FastifyServerOptions = {}) => {
  const fastify = Fastify(opts);

  fastify.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    trpcOptions: { router: appRouter, createContext },
  });

  // Register all plugins in the `src/plugins` directory.
  fastify.register(autoload, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  return fastify;
};

/**
 * Properly close the server and services
 * @param server Fastify server instance.
 * @see https://www.fastify.io/docs/latest/Reference/Server/#close
 * @description This function is used to close the server and services after all
 * tests are done (see `vitestHelper.ts`) or after the swagger docs are generated
 * (see `generate-docs.ts` file).
 */
export function closeServer(server: FastifyInstance) {
  server.log.info("Closing up server and resources...");
  server.close();
}
