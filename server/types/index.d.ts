declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE: string;
      ACCESS_SECRET: string;
      REFRESH_SECRET: string;
      PORT?: number;
      NODE_ENV: "development" | "production";
      TWILIO_ACCOUNT_SID: string;
      TWILIO_AUTH_TOKEN: string;
      TWILIO_SERVICE_SID: string;
    }
  }
}
declare module "fastify" {
  interface FastifyRequest {
    userId: string;
  }
}
export {};
