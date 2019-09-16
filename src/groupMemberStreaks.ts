import { AxiosInstance } from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import GroupMemberStreak from "./models/GroupMemberStreak";

export default (streakoidClient: AxiosInstance) => {
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

  const getOne = async (
    groupMemberStreakId: string
  ): Promise<GroupMemberStreak> => {
    const { data } = await streakoidClient.get(
      `/${ApiVersions.v1}/${RouterCategories.groupMemberStreaks}/${groupMemberStreakId}`
    );
    return data;
  };

  const deleteOne = (groupMemberStreakId: string) => {
    return streakoidClient.delete(
      `/${ApiVersions.v1}/${RouterCategories.groupMemberStreaks}/${groupMemberStreakId}`
    );
  };

  return {
    getOne,
    create,
    deleteOne
  };
};
