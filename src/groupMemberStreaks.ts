import { AxiosInstance } from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import GroupMemberStreak from "./models/GroupMemberStreak";

export default (streakoidClient: AxiosInstance) => {
  const getAll = async ({
    userId,
    completedToday,
    timezone,
    active
  }: {
    userId?: string;
    completedToday?: boolean;
    timezone?: string;
    active?: boolean;
  }): Promise<GroupMemberStreak[]> => {
    try {
      let getAllGroupMemberStreaksURL = `/${ApiVersions.v1}/${RouterCategories.groupMemberStreaks}?`;

      if (userId) {
        getAllGroupMemberStreaksURL = `${getAllGroupMemberStreaksURL}userId=${userId}&`;
      }

      if (completedToday !== undefined) {
        getAllGroupMemberStreaksURL = `${getAllGroupMemberStreaksURL}completedToday=${Boolean(
          completedToday
        )}&`;
      }

      if (timezone) {
        getAllGroupMemberStreaksURL = `${getAllGroupMemberStreaksURL}timezone=${timezone}&`;
      }

      if (active !== undefined) {
        getAllGroupMemberStreaksURL = `${getAllGroupMemberStreaksURL}active=${Boolean(
          active
        )}`;
      }

      const { data } = await streakoidClient.get(getAllGroupMemberStreaksURL);
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const getOne = async (
    groupMemberStreakId: string
  ): Promise<GroupMemberStreak> => {
    try {
      const { data } = await streakoidClient.get(
        `/${ApiVersions.v1}/${RouterCategories.groupMemberStreaks}/${groupMemberStreakId}`
      );
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const create = async ({
    userId,
    teamStreakId
  }: {
    userId: string;
    teamStreakId: string;
  }): Promise<GroupMemberStreak> => {
    try {
      const { data } = await streakoidClient.post(
        `/${ApiVersions.v1}/${RouterCategories.groupMemberStreaks}`,
        { userId, teamStreakId }
      );
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const deleteOne = (groupMemberStreakId: string) => {
    try {
      return streakoidClient.delete(
        `/${ApiVersions.v1}/${RouterCategories.groupMemberStreaks}/${groupMemberStreakId}`
      );
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return {
    getAll,
    getOne,
    create,
    deleteOne
  };
};
