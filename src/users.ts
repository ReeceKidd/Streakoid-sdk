import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import User from './models/User';
import { friends } from './friends';
import { FormattedUser } from '.';

export interface Users {
    getAll: ({
        searchQuery,
        username,
        email,
    }: {
        searchQuery?: string;
        username?: string;
        email?: string;
    }) => Promise<FormattedUser[]>;
    getOne: (userId: string) => Promise<FormattedUser>;
    create: ({ username, email }: { username: string; email: string }) => Promise<User>;
    update: ({
        userId,
        updateData,
    }: {
        userId: string;
        updateData?: {
            timezone?: string;
        };
    }) => Promise<User>;
    friends: ReturnType<typeof friends>;
}

const users = (streakoidClient: AxiosInstance): Users => {
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

    const create = async ({ username, email }: { username: string; email: string }): Promise<User> => {
        try {
            const response = await streakoidClient.post(`/${ApiVersions.v1}/${RouterCategories.users}`, {
                username,
                email,
            });
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const update = async ({
        userId,
        updateData,
    }: {
        userId: string;
        updateData?: {
            timezone?: string;
        };
    }): Promise<User> => {
        try {
            const { data } = await streakoidClient.patch(
                `/${ApiVersions.v1}/${RouterCategories.users}/${userId}`,
                updateData,
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getAll,
        getOne,
        create,
        update,
        friends: friends(streakoidClient),
    };
};

export { users };
