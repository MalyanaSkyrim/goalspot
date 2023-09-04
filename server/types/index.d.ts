declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE: string;
      SECRET: string;
      PORT?: number;
      NODE_ENV: "development" | "production";
      TWILIO_ACCOUNT_SID: string;
      TWILIO_AUTH_TOKEN: string;
      TWILIO_SERVICE_SID: string;
    }
  }
}

export {};
