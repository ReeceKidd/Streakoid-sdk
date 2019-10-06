import { AxiosInstance } from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";

import GroupMember from "./models/GroupMember";
import TeamStreakRouterCategories from "./TeamStreakRouterCategories";

export default (streakoidClient: AxiosInstance) => {
  const create = async ({
    friendId,
    teamStreakId
  }: {
    friendId: string;
    teamStreakId: string;
  }): Promise<GroupMember[]> => {
    try {
      const { data } = await streakoidClient.post(
        `/${ApiVersions.v1}/${RouterCategories.teamStreaks}/${teamStreakId}/${TeamStreakRouterCategories.members}`,
        { friendId }
      );
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const deleteOne = ({
    teamStreakId,
    memberId
  }: {
    teamStreakId: string;
    memberId: string;
  }) => {
    try {
      return streakoidClient.delete(
        `/${ApiVersions.v1}/${RouterCategories.teamStreaks}/${teamStreakId}/${TeamStreakRouterCategories.members}/${memberId}`
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
