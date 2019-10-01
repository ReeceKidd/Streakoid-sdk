import { AxiosInstance } from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import User from "./models/User";

export default (streakoidClient: AxiosInstance) => {
  const getAll = async ({
    searchQuery,
    username,
    email
  }: {
    searchQuery?: string;
    username?: string;
    email?: string;
  }): Promise<User[]> => {
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
  };

  const getOne = async (userId: string): Promise<User> => {
    const { data } = await streakoidClient.get(
      `/${ApiVersions.v1}/${RouterCategories.users}/${userId}`
    );
    return data;
  };

  const create = async ({
    username,
    email
  }: {
    username: string;
    email: string;
  }): Promise<User> => {
    try {
      const response = await streakoidClient.post(
        `/${ApiVersions.v1}/${RouterCategories.users}`,
        {
          username,
          email
        }
      );
      return response.data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const update = async ({
    userId,
    updateData
  }: {
    userId: string;
    updateData?: {
      timezone?: string;
    };
  }): Promise<User> => {
    const { data } = await streakoidClient.patch(
      `/${ApiVersions.v1}/${RouterCategories.users}/${userId}`,
      updateData
    );
    return data;
  };

  const deleteOne = (userId: string) => {
    return streakoidClient.delete(
      `/${ApiVersions.v1}/${RouterCategories.users}/${userId}`
    );
  };

  return {
    getAll,
    getOne,
    create,
    update,
    deleteOne
  };
};
