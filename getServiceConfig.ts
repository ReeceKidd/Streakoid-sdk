import dotenv from 'dotenv';
dotenv.config();

export interface AppConfigHttp {
    NODE_ENV: string;
    DATABASE_URI: string;
    USER: string;
    EMAIL: string;
    PASSWORD: string;
    APPLICATION_URL: string;
    ORIGINAL_IMAGE_URL: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_REGION: string;
}

export type AppConfig = AppConfigHttp;

export const getServiceConfig = (environment: NodeJS.ProcessEnv = process.env): AppConfig => {
    const {
        NODE_ENV,
        DATABASE_URI,
        USER,
        EMAIL,
        PASSWORD,
        APPLICATION_URL,
        ORIGINAL_IMAGE_URL,
        AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY,
        AWS_REGION,
    } = environment;

    if (!NODE_ENV) throw new Error('NODE_ENV is not provided.');

    if (!DATABASE_URI) throw new Error('DATABASE_URI is not provided.');

    if (!USER) throw new Error('USER is not provided.');

    if (!EMAIL) throw new Error('EMAIL is not provided.');

    if (!PASSWORD) throw new Error('PASSWORD is not provided.');

    if (!AWS_ACCESS_KEY_ID) {
        throw new Error('AWS_ACCESS_KEY_ID is not provided.');
    }

    if (!AWS_SECRET_ACCESS_KEY) {
        throw new Error('AWS_SECRET_ACCESS_KEY is not provided.');
    }

    if (!AWS_REGION) {
        throw new Error('AWS_REGION is not provided.');
    }

    if (!APPLICATION_URL) {
        throw new Error('APPLICATION_URL is not provided.');
    }

    return {
        NODE_ENV,
        DATABASE_URI,
        USER,
        EMAIL,
        PASSWORD,
        APPLICATION_URL,
        ORIGINAL_IMAGE_URL,
        AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY,
        AWS_REGION,
    } as AppConfigHttp;
};
