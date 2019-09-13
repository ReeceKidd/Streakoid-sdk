import axios from "axios";

import ApiVersions from './ApiVersions'
import RouterCategories from "./RouterCategories";
import SupportedRequestHeaders from "./SupportedRequestHeaders";
import GroupStreakRouterCategories from "./GroupStreakRouterCategories";
import { GroupMember } from "./models/GroupMember";

export default (applicationUrl: string) => {
  const create = async ({
    friendId,
    groupStreakId,
    timezone
  }: {
      friendId: string;
      groupStreakId: string;
      timezone: string;
    }): Promise<GroupMember[]> => {
    const { data } = await axios.post(
      `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.groupStreaks}/${groupStreakId}/${GroupStreakRouterCategories.members}`,
      { friendId },
      { headers: { [SupportedRequestHeaders.xTimezone]: timezone } }
    );
    return data
  };

  const deleteOne = ({
    groupStreakId,
    memberId
  }: {
      groupStreakId: string;
      memberId: string;
    }) => {
    return axios.delete(
      `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.groupStreaks}/${groupStreakId}/${GroupStreakRouterCategories.members}/${memberId}`
    );
  };

  return {
    create,
    deleteOne
  };
};
