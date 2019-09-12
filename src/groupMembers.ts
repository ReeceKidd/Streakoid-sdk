import axios from "axios";

import ApiVersions from './ApiVersions'
import RouterCategories from "./RouterCategories";
import SupportedRequestHeaders from "./SupportedRequestHeaders";
import GroupStreakRouterCategories from "./GroupStreakRouterCategories";

export default (applicationUrl: string) => {
  const create = ({
    friendId,
    groupStreakId,
    timezone
  }: {
      friendId: string;
      groupStreakId: string;
      timezone: string;
    }) => {
    return axios.post(
      `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.groupStreaks}/${groupStreakId}/${GroupStreakRouterCategories.members}`,
      { friendId },
      { headers: { [SupportedRequestHeaders.xTimezone]: timezone } }
    );
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
