import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

type LogData = {
  data: unknown;
  message: string;
};
export class LogDataResolver {
  onRequest(req: FastifyRequest): LogData {
    return {
      data: {
        remoteAddress: req.ip,
        hostname: req.hostname,
        method: req.method,
        url: req.url,
        body: req.body,
      },
      message: `Incoming request ${req.method} ${req.url}`,
    };
  }

  onError(req: FastifyRequest, error: FastifyError): LogData {
    return {
      data: {
        message: error.message,
        name: error.name,
        stack: error.stack,
      },
      message: `Failed request ${req.method} ${req.url}`,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSend(req: FastifyRequest, reply: FastifyReply, payload: unknown): LogData {
    const responseTime = reply.getResponseTime();
    return {
      data: {
        statusCode: reply.statusCode,
        responseTime,
        remoteAddress: req.ip,
        hostname: req.hostname,
        method: req.method,
        url: req.url,
        /**
         * Don't log the request body by default
         * @todo: add a debug mode to log the request body
         */
        payload: process.env.NODE_ENV === "production" ? payload : undefined,
      },
      message: `Completed request ${req.method} ${req.url} with status code ${reply.statusCode}`,
    };
  }
}
