import axios from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import SupportedRequestHeaders from "./SupportedRequestHeaders";
import groupMembers from "./groupMembers";
import { GroupStreak, PopulatedGroupStreak } from "./models/GroupStreak";



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
    let getAllSoloStreaksURL = `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.groupStreaks}?`;
    if (creatorId) {
      getAllSoloStreaksURL = `${getAllSoloStreaksURL}creatorId=${creatorId}&`;
    }
    if (memberId) {
      getAllSoloStreaksURL = `${getAllSoloStreaksURL}memberId=${memberId}&`;
    }
    if (timezone) {
      getAllSoloStreaksURL = `${getAllSoloStreaksURL}timezone=${timezone}`;
    }
    const { data } = await axios.get(getAllSoloStreaksURL);
    return data
  };

  const getOne = async (groupStreakId: string): Promise<PopulatedGroupStreak> => {
    const { data } = await axios.get(
      `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.groupStreaks}/${groupStreakId}`
    );
    return data
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
    const { data } = await axios.post(
      `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.groupStreaks}`,
      { creatorId, streakName, streakDescription, numberOfMinutes, members },
      { headers: { [SupportedRequestHeaders.xTimezone]: timezone } }
    );
    return data
  };

  const update = async (
    { groupStreakId, timezone, updateData }: {
      groupStreakId: string,
      timezone: string,
      updateData: {
        creatorId?: string;
        streakName?: string;
        streakDescription?: string;
        numberOfMinutes?: number;
        timezone?: string;
      }
    }
  ): Promise<GroupStreak> => {
    const { data } = await axios.patch(
      `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.groupStreaks}/${groupStreakId}`,
      updateData,
      { headers: { [SupportedRequestHeaders.xTimezone]: timezone } }
    );
    return data
  };

  const deleteOne = (groupStreakId: string) => {
    return axios.delete(
      `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.groupStreaks}/${groupStreakId}`
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
