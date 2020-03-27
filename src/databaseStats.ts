import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import DatabaseStats from './models/DatabaseStats';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const databaseStats = (streakoidClient: AxiosInstance) => {
    const get = async (): Promise<DatabaseStats> => {
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
