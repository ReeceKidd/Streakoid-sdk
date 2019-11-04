import { databaseUri } from './environment';

const isTestEnvironment = (): boolean => {
    return process.env.NODE_ENV === 'test' && databaseUri.includes('test');
};

export { isTestEnvironment };
