import { getServiceConfig } from '../../src/getServiceConfig';

const { NODE_ENV, TEST_DATABASE_URI } = getServiceConfig();

const isTestEnvironment = (): boolean => {
    return NODE_ENV === 'test' && TEST_DATABASE_URI.includes('TEST');
};

export { isTestEnvironment };
