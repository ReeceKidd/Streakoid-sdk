import axios, { AxiosInstance } from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import Friend from "./models/Friend";

export default (streakoidClient: AxiosInstance) => {
  const getAll = async (userId: string): Promise<Friend[]> => {
    try {
      const { data } = await streakoidClient.get(
        `/${ApiVersions.v1}/${RouterCategories.users}/${userId}/${RouterCategories.friends}`
      );
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const addFriend = async ({
    userId,
    friendId
  }: {
    userId: string;
    friendId: string;
  }): Promise<Friend[]> => {
    const { data } = await streakoidClient
      .post(
        `/${ApiVersions.v1}/${RouterCategories.users}/${userId}/${RouterCategories.friends}`,
        {
          friendId
        }
      )
      .catch(err => {
        return Promise.reject(err);
      });
    return data;
  };

  const deleteOne = (userId: string, friendId: string) => {
    try {
      return streakoidClient.delete(
        `/${ApiVersions.v1}/${RouterCategories.users}/${userId}/${RouterCategories.friends}/${friendId}`
      );
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return {
    getAll,
    addFriend,
    deleteOne
  };
};
