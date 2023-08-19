import { RouteHandler } from "fastify";

import { formatDuration, intervalToDuration } from "date-fns";

function getReadableUptime() {
  const uptime = process.uptime();

  return formatDuration(intervalToDuration({ start: 0, end: uptime * 1000 }));
}

import type { HealthOutputType } from "./health.schema";

/**
 * @todo Add dynamic docURL and apiVersions
 */
export const healthHandler: RouteHandler<{
  Reply: HealthOutputType;
}> = async (_, reply) => {
  reply.code(200).send({
    status: "OK",
    uptime: getReadableUptime(),
    docURL: "https://www.goal-spot.com/",
    apiVersions: "1",
  });
};
