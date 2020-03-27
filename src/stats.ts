import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import Stats from './models/Stats';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const stats = (streakoidClient: AxiosInstance) => {
    const get = async (): Promise<Stats> => {
        try {
            const { data } = await streakoidClient.get(`/${ApiVersions.v1}/${RouterCategories.stats}`);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        get,
    };
};

export { stats };
