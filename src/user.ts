import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import User from './models/User';

export interface Users {
    getCurrentUser: () => Promise<User>;
}

const user = (streakoidClient: AxiosInstance): Users => {
    const getCurrentUser = async (): Promise<User> => {
        try {
            const { data } = await streakoidClient.get(`/${ApiVersions.v1}/${RouterCategories.user}`);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getCurrentUser,
    };
};

export { user };
