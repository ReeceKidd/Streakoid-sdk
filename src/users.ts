import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import { friends } from './friends';
import { FormattedUser, CurrentUser } from '.';

const users = (streakoidClient: AxiosInstance) => {
    const create = async ({ username, email }: { username: string; email: string }): Promise<CurrentUser> => {
        try {
            const response = await streakoidClient.post(`/${ApiVersions.v1}/${RouterCategories.user}`, {
                username,
                email,
            });
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

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
        create,
        getAll,
        getOne,
        friends: friends(streakoidClient),
    };
};

export { users };
