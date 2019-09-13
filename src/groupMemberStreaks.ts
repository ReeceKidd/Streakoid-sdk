import axios from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import SupportedRequestHeaders from "./SupportedRequestHeaders";
import { GroupMemberStreak } from "./models/GroupMemberStreak";

export default (applicationUrl: string) => {
  const create = async ({ userId, groupStreakId, timezone }: { userId: string, groupStreakId: string, timezone: string }): Promise<GroupMemberStreak> => {
    const { data } = await axios.post(
      `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.groupMemberStreaks}`,
      { userId, groupStreakId },
      { headers: { [SupportedRequestHeaders.xTimezone]: timezone } }
    );
    return data;
  };

  const getOne = async (groupMemberStreakId: string): Promise<GroupMemberStreak> => {
    const { data } = await axios.get(
      `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.groupMemberStreaks}/${groupMemberStreakId}`
    );
    return data;
  };

  const deleteOne = (groupMemberStreakId: string) => {
    return axios.delete(
      `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.groupMemberStreaks}/${groupMemberStreakId}`
    );
  };

  return {
    getOne,
    create,
    deleteOne
  };
};
