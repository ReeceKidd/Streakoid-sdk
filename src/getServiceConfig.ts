export interface AppConfigHttp {
    NODE_ENV: string;
    APPLICATION_URL: string;
    COGNITO_USERNAME: string;
    COGNITO_EMAIL: string;
    COGNITO_PASSWORD: string;
}

export type AppConfig = AppConfigHttp;

import dotenv from 'dotenv';
dotenv.config();

export const getServiceConfig = (environment: NodeJS.ProcessEnv = process.env): AppConfig => {
    const { NODE_ENV, APPLICATION_URL, COGNITO_USERNAME, COGNITO_EMAIL, COGNITO_PASSWORD } = environment;

    return {
        NODE_ENV,
        APPLICATION_URL,
        COGNITO_USERNAME,
        COGNITO_EMAIL,
        COGNITO_PASSWORD,
    } as AppConfigHttp;
};
