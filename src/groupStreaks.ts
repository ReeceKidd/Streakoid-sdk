import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import SupportedRequestHeaders from "./SupportedRequestHeaders";
import groupMembers from "./groupMembers";
import GroupStreak from "./models/GroupStreak";
import PopulatedGroupStreak from "./models/PopulatedGroupStreak";
import axiosClient from "./axiosClient";

export default (applicationUrl: string) => {
  const getAll = async ({
    creatorId,
    memberId,
    timezone
  }: {
    creatorId?: string;
    memberId?: string;
    timezone?: string;
  }): Promise<PopulatedGroupStreak[]> => {
    let getAllSoloStreaksURL = `/${ApiVersions.v1}/${RouterCategories.groupStreaks}?`;
    if (creatorId) {
      getAllSoloStreaksURL = `${getAllSoloStreaksURL}creatorId=${creatorId}&`;
    }
    if (memberId) {
      getAllSoloStreaksURL = `${getAllSoloStreaksURL}memberId=${memberId}&`;
    }
    if (timezone) {
      getAllSoloStreaksURL = `${getAllSoloStreaksURL}timezone=${timezone}`;
    }
    const { data } = await axiosClient.get(getAllSoloStreaksURL);
    return data;
  };

  const getOne = async (
    groupStreakId: string
  ): Promise<PopulatedGroupStreak> => {
    const { data } = await axiosClient.get(
      `/${ApiVersions.v1}/${RouterCategories.groupStreaks}/${groupStreakId}`
    );
    return data;
  };

  const create = async ({
    creatorId,
    streakName,
    timezone,
    streakDescription,
    numberOfMinutes,
    members
  }: {
    creatorId: string;
    streakName: string;
    timezone: string;
    members: { memberId: string; groupMemberStreakId?: string }[];
    streakDescription?: string;
    numberOfMinutes?: number;
  }): Promise<GroupStreak> => {
    const { data } = await axiosClient.post(
      `/${ApiVersions.v1}/${RouterCategories.groupStreaks}`,
      { creatorId, streakName, streakDescription, numberOfMinutes, members },
      { headers: { [SupportedRequestHeaders.xTimezone]: timezone } }
    );
    return data;
  };

  const update = async ({
    groupStreakId,
    timezone,
    updateData
  }: {
    groupStreakId: string;
    timezone: string;
    updateData: {
      creatorId?: string;
      streakName?: string;
      streakDescription?: string;
      numberOfMinutes?: number;
      timezone?: string;
    };
  }): Promise<GroupStreak> => {
    const { data } = await axiosClient.patch(
      `/${ApiVersions.v1}/${RouterCategories.groupStreaks}/${groupStreakId}`,
      updateData,
      { headers: { [SupportedRequestHeaders.xTimezone]: timezone } }
    );
    return data;
  };

  const deleteOne = (groupStreakId: string) => {
    return axiosClient.delete(
      `/${ApiVersions.v1}/${RouterCategories.groupStreaks}/${groupStreakId}`
    );
  };

  return {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
    groupMembers: groupMembers(applicationUrl)
  };
};
