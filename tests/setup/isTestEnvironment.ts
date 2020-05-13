import { getServiceConfig } from '../../getServiceConfig';

const isTestEnvironment = (): boolean => {
    const nodeEnv = getServiceConfig().NODE_ENV;
    const databaseUri = getServiceConfig().DATABASE_URI;
    return nodeEnv === 'test' && databaseUri.includes('test');
};

export { isTestEnvironment };
