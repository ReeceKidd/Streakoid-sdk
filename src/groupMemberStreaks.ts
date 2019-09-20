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
  };

  const getOne = async (
    groupMemberStreakId: string
  ): Promise<GroupMemberStreak> => {
    const { data } = await streakoidClient.get(
      `/${ApiVersions.v1}/${RouterCategories.groupMemberStreaks}/${groupMemberStreakId}`
    );
    return data;
  };

  const create = async ({
    userId,
    groupStreakId
  }: {
    userId: string;
    groupStreakId: string;
  }): Promise<GroupMemberStreak> => {
    const { data } = await streakoidClient.post(
      `/${ApiVersions.v1}/${RouterCategories.groupMemberStreaks}`,
      { userId, groupStreakId }
    );
    return data;
  };

  const deleteOne = (groupMemberStreakId: string) => {
    return streakoidClient.delete(
      `/${ApiVersions.v1}/${RouterCategories.groupMemberStreaks}/${groupMemberStreakId}`
    );
  };

  return {
    getAll,
    getOne,
    create,
    deleteOne
  };
};
