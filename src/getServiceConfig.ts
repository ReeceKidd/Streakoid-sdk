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

  return {
    NODE_ENV,
    APPLICATION_URL
  } as AppConfigHttp;
};
