import { AxiosInstance } from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import SupportedRequestHeaders from "./SupportedRequestHeaders";
import GroupStreakRouterCategories from "./GroupStreakRouterCategories";
import GroupMember from "./models/GroupMember";

export default (streakoidClient: AxiosInstance) => {
  const create = async ({
    friendId,
    groupStreakId,
    timezone
  }: {
    friendId: string;
    groupStreakId: string;
    timezone: string;
  }): Promise<GroupMember[]> => {
    const { data } = await streakoidClient.post(
      `/${ApiVersions.v1}/${RouterCategories.groupStreaks}/${groupStreakId}/${GroupStreakRouterCategories.members}`,
      { friendId },
      { headers: { [SupportedRequestHeaders.xTimezone]: timezone } }
    );
    return data;
  };

  const deleteOne = ({
    groupStreakId,
    memberId
  }: {
    groupStreakId: string;
    memberId: string;
  }) => {
    return streakoidClient.delete(
      `/${ApiVersions.v1}/${RouterCategories.groupStreaks}/${groupStreakId}/${GroupStreakRouterCategories.members}/${memberId}`
    );
  };

  return {
    create,
    deleteOne
  };
};
