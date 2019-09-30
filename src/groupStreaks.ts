import { AxiosInstance } from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import groupMembers from "./groupMembers";
import GroupStreak from "./models/GroupStreak";
import PopulatedGroupStreak from "./models/PopulatedGroupStreak";
import StreakStatus from "./StreakStatus";

export default (streakoidClient: AxiosInstance) => {
  const getAll = async ({
    creatorId,
    memberId,
    timezone,
    status
  }: {
    creatorId?: string;
    memberId?: string;
    timezone?: string;
    status?: StreakStatus;
  }): Promise<PopulatedGroupStreak[]> => {
    let getAllGroupStreaksURL = `/${ApiVersions.v1}/${RouterCategories.groupStreaks}?`;
    if (creatorId) {
      getAllGroupStreaksURL = `${getAllGroupStreaksURL}creatorId=${creatorId}&`;
    }
    if (memberId) {
      getAllGroupStreaksURL = `${getAllGroupStreaksURL}memberId=${memberId}&`;
    }
    if (timezone) {
      getAllGroupStreaksURL = `${getAllGroupStreaksURL}timezone=${timezone}&`;
    }
    if (status) {
      getAllGroupStreaksURL = `${getAllGroupStreaksURL}status=${status}&`;
    }
    const { data } = await streakoidClient.get(getAllGroupStreaksURL);
    return data;
  };

  const getOne = async (
    groupStreakId: string
  ): Promise<PopulatedGroupStreak> => {
    const { data } = await streakoidClient.get(
      `/${ApiVersions.v1}/${RouterCategories.groupStreaks}/${groupStreakId}`
    );
    return data;
  };

  const create = async ({
    creatorId,
    streakName,
    streakDescription,
    numberOfMinutes,
    members
  }: {
    creatorId: string;
    streakName: string;
    members: { memberId: string; groupMemberStreakId?: string }[];
    streakDescription?: string;
    numberOfMinutes?: number;
  }): Promise<GroupStreak> => {
    const { data } = await streakoidClient.post(
      `/${ApiVersions.v1}/${RouterCategories.groupStreaks}`,
      { creatorId, streakName, streakDescription, numberOfMinutes, members }
    );
    return data;
  };

  const update = async ({
    groupStreakId,
    updateData
  }: {
    groupStreakId: string;
    updateData: {
      creatorId?: string;
      streakName?: string;
      streakDescription?: string;
      numberOfMinutes?: number;
      timezone?: string;
      status?: StreakStatus;
    };
  }): Promise<GroupStreak> => {
    const { data } = await streakoidClient.patch(
      `/${ApiVersions.v1}/${RouterCategories.groupStreaks}/${groupStreakId}`,
      updateData
    );
    return data;
  };

  const deleteOne = (groupStreakId: string) => {
    return streakoidClient.delete(
      `/${ApiVersions.v1}/${RouterCategories.groupStreaks}/${groupStreakId}`
    );
  };

  return {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
    groupMembers: groupMembers(streakoidClient)
  };
};
