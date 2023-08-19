import fs from "fs";

import { createServer, generateSwaggerDocs, ServerOptions } from "./server";

const port = process.env.PORT || 3001;

const prodConfig: ServerOptions = {
  disableRequestLogging: true,
  bodyLimit: 20000000,
};

export const devConfig: ServerOptions = {
  disableRequestLogging: true,
  bodyLimit: 20000000,
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        destination: 1,
        colorize: true,
        translateTime: "HH:MM:ss.l",
        ignore: "pid,hostname",
      },
    },
  },
  isDocPrivate: true,
};

const server = createServer(
  process.env.NODE_ENV === "production" ? prodConfig : devConfig
);

const start = async () => {
  try {
    await server.listen({
      port: +port,
      host: "0.0.0.0",
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }

  try {
    // check we're running in a docker container
    if (process.env.NODE_ENV === "development") {
      const isDocker =
        // cspell:disable-next-line
        fs.access("/.dockerenv", fs.constants.F_OK, (err) =>
          server.log.info(
            `Service ${err ? "isn't" : "is"} running in a Docker container`
          )
        ) !== null;
      if (!isDocker) {
        generateSwaggerDocs(server, true);
      }
    }
  } catch (error) {
    server.log.error(error);
  }
};

start();
