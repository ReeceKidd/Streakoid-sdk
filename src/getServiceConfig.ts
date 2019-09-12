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
    const {
        NODE_ENV,
        APPLICATION_URL,
    } = environment;

    if (!NODE_ENV) throw new Error("NODE_ENV is not provided.");

    if (!APPLICATION_URL) {
        throw new Error("APPLICATION_URL is not provided.");
    }

    return {
        NODE_ENV,
        APPLICATION_URL,
    } as AppConfigHttp;
};
