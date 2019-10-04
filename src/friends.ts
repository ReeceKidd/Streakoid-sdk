import { AxiosInstance } from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import Friend from "./models/Friend";

export default (streakoidClient: AxiosInstance) => {
  const getAll = async (userId: string): Promise<Friend[]> => {
    const { data } = await streakoidClient.get(
      `/${ApiVersions.v1}/${RouterCategories.users}/${userId}/${RouterCategories.friends}`
    );
    return data;
  };

  // See if I can get these error messages to display and then remove
  // all promise.rejects.

  const addFriend = async ({
    userId,
    friendId
  }: {
    userId: string;
    friendId: string;
  }): Promise<Friend[]> => {
    return streakoidClient
      .post(
        `/${ApiVersions.v1}/${RouterCategories.users}/${userId}/${RouterCategories.friends}`,
        {
          friendId
        }
      )
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err;
      });
  };

  const deleteOne = (userId: string, friendId: string) => {
    return streakoidClient.delete(
      `/${ApiVersions.v1}/${RouterCategories.users}/${userId}/${RouterCategories.friends}/${friendId}`
    );
  };

  return {
    getAll,
    addFriend,
    deleteOne
  };
};
