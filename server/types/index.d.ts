declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE: string;
      SECRET: string;
      PORT?: number;
      NODE_ENV: "development" | "production";
    }
  }
}

export {};
