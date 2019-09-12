import axios from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import SupportedRequestHeaders from "./SupportedRequestHeaders";
import groupMembers from "./groupMembers";



export default (applicationUrl: string) => {
  const getAll = ({
    creatorId,
    memberId,
    timezone
  }: {
      creatorId?: string;
      memberId?: string;
      timezone?: string;
    }) => {
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
    return axios.get(getAllSoloStreaksURL);
  };

  const getOne = (groupStreakId: string) => {
    return axios.get(
      `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.groupStreaks}/${groupStreakId}`
    );
  };

  const create = ({
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
    }) => {
    return axios.post(
      `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.groupStreaks}`,
      { creatorId, streakName, streakDescription, numberOfMinutes, members },
      { headers: { [SupportedRequestHeaders.xTimezone]: timezone } }
    );
  };

  const update = (
    groupStreakId: string,
    timezone: string,
    data?: {
      creatorId?: string;
      streakName?: string;
      streakDescription?: string;
      numberOfMinutes?: number;
      timezone?: string;
    }
  ) => {
    return axios.patch(
      `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.groupStreaks}/${groupStreakId}`,
      data,
      { headers: { [SupportedRequestHeaders.xTimezone]: timezone } }
    );
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
