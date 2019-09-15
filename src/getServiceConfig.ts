export interface AppConfigHttp {
  NODE_ENV: string;
  APPLICATION_URL: string;
}

export type AppConfig = AppConfigHttp;

import dotenv from "dotenv";
dotenv.config();

export const getServiceConfig = (
  environment: NodeJS.ProcessEnv = process.env
): AppConfig => {
  const { NODE_ENV, APPLICATION_URL } = environment;

  if (!APPLICATION_URL) {
    console.log("APPLICATION_URL is not provided.");
  }

  return {
    NODE_ENV,
    APPLICATION_URL
  } as AppConfigHttp;
};
