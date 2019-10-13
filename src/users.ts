import { AxiosInstance, AxiosResponse } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import User from './models/User';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const users = (streakoidClient: AxiosInstance) => {
    const getAll = async ({
        searchQuery,
        username,
        email,
    }: {
        searchQuery?: string;
        username?: string;
        email?: string;
    }): Promise<User[]> => {
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

    const getOne = async (userId: string): Promise<User> => {
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

    const deleteOne = (userId: string): Promise<AxiosResponse> => {
        try {
            return streakoidClient.delete(`/${ApiVersions.v1}/${RouterCategories.users}/${userId}`);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getAll,
        getOne,
        create,
        update,
        deleteOne,
    };
};

export { users };
