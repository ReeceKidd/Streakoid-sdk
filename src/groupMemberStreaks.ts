import axios from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import SupportedRequestHeaders from "./SupportedRequestHeaders";

export default (applicationUrl: string) => {
  const create = (userId: string, groupStreakId: string, timezone: string) => {
    return axios.post(
      `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.groupMemberStreaks}`,
      { userId, groupStreakId },
      { headers: { [SupportedRequestHeaders.xTimezone]: timezone } }
    );
  };

  const getOne = (groupMemberStreakId: string) => {
    return axios.get(
      `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.groupMemberStreaks}/${groupMemberStreakId}`
    );
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
