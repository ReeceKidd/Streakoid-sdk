import axios from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import Friend from "./models/Friend";
import SupportedRequestHeaders from "./SupportedRequestHeaders";

export default (applicationUrl: string, timezone: string) => {
  const getAll = async (userId: string): Promise<Friend[]> => {
    try {
      const { data } = await axios.get(
        `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.users}/${userId}/${RouterCategories.friends}`,
        {
          headers: {
            "Content-Type": "application/json",
            [SupportedRequestHeaders.xTimezone]: timezone
          }
        }
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
    try {
      const { data } = await axios.post(
        `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.users}/${userId}/${RouterCategories.friends}`,
        {
          friendId
        },
        {
          headers: {
            "Content-Type": "application/json",
            [SupportedRequestHeaders.xTimezone]: timezone
          }
        }
      );
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const deleteOne = (userId: string, friendId: string) => {
    try {
      return axios.delete(
        `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.users}/${userId}/${RouterCategories.friends}/${friendId}`,
        {
          headers: {
            "Content-Type": "application/json",
            [SupportedRequestHeaders.xTimezone]: timezone
          }
        }
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
