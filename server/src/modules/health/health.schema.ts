import { FastifySchema } from "fastify";
import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

/**
 * @fileoverview Schema Definitions - Health
 * Don't forget to update the schemas.ts file when adding new schemas
 */

// Zod schema definitions.
const healthReplySchema = z.object(
  {
    status: z.string({ description: "Status of the server" }),
    uptime: z.string({ description: "Uptime of the server" }),
    docURL: z.string({ description: "URL of the API documentation" }).url(),
    apiVersions: z.string({ description: "List of API versions" }),
  },
  { description: "Reply for the health check" }
);

// Generated types from zod schemas.
export type HealthOutputType = z.infer<typeof healthReplySchema>;

// Generate JSON schemas from zod schemas.
export const { schemas: healthSchemas, $ref: healthRef } = buildJsonSchemas(
  {
    healthReplySchema,
  },
  { $id: "healthSchemas" }
);

// Export Fastify schemas.
export const schema: FastifySchema = {
  tags: ["Server Health"],
  description: "Get the health of the server and some useful information.",
  security: [{ apiKey: [] }],
  summary: "Get server health",
  operationId: "healthCheck",
  response: { 200: healthRef("healthReplySchema") },
};
