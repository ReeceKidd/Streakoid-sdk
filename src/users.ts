import { AxiosInstance } from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import User from "./models/User";

export default (streakoidClient: AxiosInstance) => {
  const getAll = async (searchQuery?: string): Promise<User[]> => {
    let getAllUsersURL = `/${ApiVersions.v1}/${RouterCategories.users}?`;
    if (searchQuery) {
      getAllUsersURL = `${getAllUsersURL}searchQuery=${searchQuery}`;
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
    const { data } = await streakoidClient.post(
      `/${ApiVersions.v1}/${RouterCategories.users}`,
      {
        username,
        email
      }
    );
    return data;
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
