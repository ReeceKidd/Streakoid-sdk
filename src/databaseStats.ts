import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import Stats from './models/Stats';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const databaseStats = (streakoidClient: AxiosInstance) => {
    const get = async (): Promise<Stats> => {
        try {
            const { data } = await streakoidClient.get(`/${ApiVersions.v1}/${RouterCategories.databaseStats}`);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        get,
    };
};

export { databaseStats };
