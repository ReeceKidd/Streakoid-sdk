import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import { friends } from './friends';
import { FormattedUser } from '.';

const users = (streakoidClient: AxiosInstance) => {
    const getAll = async ({
        searchQuery,
        username,
        email,
    }: {
        searchQuery?: string;
        username?: string;
        email?: string;
    }): Promise<FormattedUser[]> => {
        try {
            let getAllUsersURL = `/${ApiVersions.v1}/${RouterCategories.users}?`;
            if (searchQuery) {
                getAllUsersURL = `${getAllUsersURL}searchQuery=${searchQuery}&`;
            } else if (username) {
                getAllUsersURL = `${getAllUsersURL}username=${username}&`;
            } else if (email) {
                getAllUsersURL = `${getAllUsersURL}email=${email}&`;
            }
            const { data } = await streakoidClient.get(getAllUsersURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const getOne = async (userId: string): Promise<FormattedUser> => {
        try {
            const { data } = await streakoidClient.get(`/${ApiVersions.v1}/${RouterCategories.users}/${userId}`);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getAll,
        getOne,
        friends: friends(streakoidClient),
    };
};

export { users };
