import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import { followers } from './followers';
import { following } from './following';
import { PopulatedCurrentUser } from '@streakoid/streakoid-models/lib/Models/PopulatedCurrentUser';
import { PopulatedUser } from '@streakoid/streakoid-models/lib/Models/PopulatedUser';
import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';
import { FormattedUser } from '@streakoid/streakoid-models/lib/Models/FormattedUser';

const users = (streakoidClient: AxiosInstance) => {
    const create = async ({ username, email }: { username: string; email: string }): Promise<PopulatedCurrentUser> => {
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

    const createTemporary = async ({ userIdentifier }: { userIdentifier: string }): Promise<PopulatedCurrentUser> => {
        try {
            const response = await streakoidClient.post(`/${ApiVersions.v1}/${RouterCategories.users}/temporary`, {
                userIdentifier,
            });
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const getAll = async ({
        limit,
        skip,
        searchQuery,
        username,
        email,
        userIds,
    }: {
        skip?: number;
        limit?: number;
        searchQuery?: string;
        username?: string;
        email?: string;
        userIds?: string[];
    }): Promise<FormattedUser[]> => {
        try {
            let getAllUsersURL = `/${ApiVersions.v1}/${RouterCategories.users}?`;
            if (limit) {
                getAllUsersURL = `${getAllUsersURL}limit=${limit}&`;
            }
            if (skip) {
                getAllUsersURL = `${getAllUsersURL}skip=${skip}&`;
            }
            if (searchQuery) {
                getAllUsersURL = `${getAllUsersURL}searchQuery=${searchQuery}&`;
            } else if (username) {
                getAllUsersURL = `${getAllUsersURL}username=${username}&`;
            } else if (email) {
                getAllUsersURL = `${getAllUsersURL}email=${email}&`;
            } else if (userIds) {
                getAllUsersURL = `${getAllUsersURL}userIds=${encodeURIComponent(JSON.stringify(userIds))}&`;
            }
            const { data } = await streakoidClient.get(getAllUsersURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const getOne = async (userId: string): Promise<PopulatedUser> => {
        try {
            const { data } = await streakoidClient.get(`/${ApiVersions.v1}/${RouterCategories.users}/${userId}`);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        create,
        createTemporary,
        getAll,
        getOne,
        followers: followers(streakoidClient),
        following: following(streakoidClient),
    };
};

export { users };
