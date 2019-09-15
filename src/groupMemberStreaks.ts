import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import SupportedRequestHeaders from "./SupportedRequestHeaders";
import GroupMemberStreak from "./models/GroupMemberStreak";
import axiosClient from "./axiosClient";

export default (applicationUrl: string) => {
  const create = async ({
    userId,
    groupStreakId,
    timezone
  }: {
    userId: string;
    groupStreakId: string;
    timezone: string;
  }): Promise<GroupMemberStreak> => {
    const { data } = await axiosClient.post(
      `/${ApiVersions.v1}/${RouterCategories.groupMemberStreaks}`,
      { userId, groupStreakId },
      { headers: { [SupportedRequestHeaders.xTimezone]: timezone } }
    );
    return data;
  };

  const getOne = async (
    groupMemberStreakId: string
  ): Promise<GroupMemberStreak> => {
    const { data } = await axiosClient.get(
      `/${ApiVersions.v1}/${RouterCategories.groupMemberStreaks}/${groupMemberStreakId}`
    );
    return data;
  };

  const deleteOne = (groupMemberStreakId: string) => {
    return axiosClient.delete(
      `/${ApiVersions.v1}/${RouterCategories.groupMemberStreaks}/${groupMemberStreakId}`
    );
  };

  return {
    getOne,
    create,
    deleteOne
  };
};
