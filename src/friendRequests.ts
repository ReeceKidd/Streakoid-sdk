import { AxiosInstance } from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import { FriendRequest, FriendRequestStatus } from ".";

export default (streakoidClient: AxiosInstance) => {
  const getAll = async ({
    requesterId,
    requesteeId,
    status
  }: {
    requesterId?: string;
    requesteeId?: string;
    status?: FriendRequestStatus;
  }): Promise<FriendRequest[]> => {
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
    requesteeId
  }: {
    requesterId: string;
    requesteeId: string;
    status?: string;
  }): Promise<FriendRequest> => {
    try {
      const { data } = await streakoidClient.post(
        `/${ApiVersions.v1}/${RouterCategories.friendRequests}`,
        { requesterId, requesteeId }
      );
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const update = async ({
    friendRequestId,
    updateData
  }: {
    friendRequestId: string;
    updateData?: {
      status: FriendRequestStatus;
    };
  }): Promise<FriendRequest> => {
    try {
      const response = await streakoidClient.patch(
        `/${ApiVersions.v1}/${RouterCategories.friendRequests}/${friendRequestId}`,
        updateData
      );
      return response.data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const deleteOne = (friendRequestId: string) => {
    try {
      return streakoidClient.delete(
        `/${ApiVersions.v1}/${RouterCategories.friendRequests}/${friendRequestId}`
      );
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return {
    getAll,
    create,
    update,
    deleteOne
  };
};
