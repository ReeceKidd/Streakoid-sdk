import { AxiosInstance } from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import GroupStreakRouterCategories from "./GroupStreakRouterCategories";
import GroupMember from "./models/GroupMember";

export default (streakoidClient: AxiosInstance) => {
  const create = async ({
    friendId,
    groupStreakId
  }: {
    friendId: string;
    groupStreakId: string;
  }): Promise<GroupMember[]> => {
    try {
      const { data } = await streakoidClient.post(
        `/${ApiVersions.v1}/${RouterCategories.groupStreaks}/${groupStreakId}/${GroupStreakRouterCategories.members}`,
        { friendId }
      );
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const deleteOne = ({
    groupStreakId,
    memberId
  }: {
    groupStreakId: string;
    memberId: string;
  }) => {
    try {
      return streakoidClient.delete(
        `/${ApiVersions.v1}/${RouterCategories.groupStreaks}/${groupStreakId}/${GroupStreakRouterCategories.members}/${memberId}`
      );
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return {
    create,
    deleteOne
  };
};
