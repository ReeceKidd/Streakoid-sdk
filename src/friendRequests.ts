import { AxiosInstance, AxiosResponse } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import { FriendRequestStatus } from '.';
import PopulatedFriendRequest from './models/PopulatedFriendRequest';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const friendRequests = (streakoidClient: AxiosInstance) => {
    const getAll = async ({
        requesterId,
        requesteeId,
        status,
    }: {
        requesterId?: string;
        requesteeId?: string;
        status?: FriendRequestStatus;
    }): Promise<PopulatedFriendRequest[]> => {
        try {
            let getAllFriendRequestsURL = `/${ApiVersions.v1}/${RouterCategories.friendRequests}?`;

            if (requesterId) {
                getAllFriendRequestsURL = `${getAllFriendRequestsURL}requesterId=${requesterId}&`;
            }

            if (requesteeId) {
                getAllFriendRequestsURL = `${getAllFriendRequestsURL}requesteeId=${requesteeId}&`;
            }

            if (status) {
                getAllFriendRequestsURL = `${getAllFriendRequestsURL}status=${status}&`;
            }

            const { data } = await streakoidClient.get(getAllFriendRequestsURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const create = async ({
        requesterId,
        requesteeId,
    }: {
        requesterId: string;
        requesteeId: string;
        status?: string;
    }): Promise<PopulatedFriendRequest> => {
        try {
            const { data } = await streakoidClient.post(`/${ApiVersions.v1}/${RouterCategories.friendRequests}`, {
                requesterId,
                requesteeId,
            });
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const update = async ({
        friendRequestId,
        updateData,
    }: {
        friendRequestId: string;
        updateData?: {
            status: FriendRequestStatus;
        };
    }): Promise<PopulatedFriendRequest> => {
        try {
            const response = await streakoidClient.patch(
                `/${ApiVersions.v1}/${RouterCategories.friendRequests}/${friendRequestId}`,
                updateData,
            );
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const deleteOne = (friendRequestId: string): Promise<AxiosResponse> => {
        try {
            return streakoidClient.delete(`/${ApiVersions.v1}/${RouterCategories.friendRequests}/${friendRequestId}`);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getAll,
        create,
        update,
        deleteOne,
    };
};

export { friendRequests };
