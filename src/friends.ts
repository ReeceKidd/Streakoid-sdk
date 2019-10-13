import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import Friend from './models/Friend';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const friends = (streakoidClient: AxiosInstance) => {
    const getAll = async (userId: string): Promise<Friend[]> => {
        const { data } = await streakoidClient.get(
            `/${ApiVersions.v1}/${RouterCategories.users}/${userId}/${RouterCategories.friends}`,
        );
        return data;
    };

    const addFriend = async ({ userId, friendId }: { userId: string; friendId: string }): Promise<Friend[]> => {
        try {
            const { data } = await streakoidClient.post(
                `/${ApiVersions.v1}/${RouterCategories.users}/${userId}/${RouterCategories.friends}`,
                {
                    friendId,
                },
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const deleteOne = async (userId: string, friendId: string): Promise<Friend[]> => {
        try {
            const { data } = await streakoidClient.patch(
                `/${ApiVersions.v1}/${RouterCategories.users}/${userId}/${RouterCategories.friends}/${friendId}`,
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getAll,
        addFriend,
        deleteOne,
    };
};

export { friends };
