import { config } from "dotenv";
import { createServer } from "./server";

config();

const port = process.env.PORT || 3001;

const prodConfig = {
  disableRequestLogging: true,
  bodyLimit: 20000000,
};

export const devConfig = {
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
};

start();
