import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const following = (streakoidClient: AxiosInstance) => {
    const getAll = async (userId: string): Promise<string[]> => {
        const { data } = await streakoidClient.get(
            `/${ApiVersions.v1}/${RouterCategories.users}/${userId}/${RouterCategories.following}`,
        );
        return data;
    };

    const followUser = async ({
        userId,
        userToFollowId,
    }: {
        userId: string;
        userToFollowId: string;
    }): Promise<string[]> => {
        try {
            const { data } = await streakoidClient.post(
                `/${ApiVersions.v1}/${RouterCategories.users}/${userId}/${RouterCategories.following}`,
                {
                    userToFollowId,
                },
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const unfollowUser = async ({
        userId,
        userToUnfollowId,
    }: {
        userId: string;
        userToUnfollowId: string;
    }): Promise<string[]> => {
        try {
            const { data } = await streakoidClient.patch(
                `/${ApiVersions.v1}/${RouterCategories.users}/${userId}/${RouterCategories.following}/${userToUnfollowId}`,
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getAll,
        followUser,
        unfollowUser,
    };
};

export { following };
