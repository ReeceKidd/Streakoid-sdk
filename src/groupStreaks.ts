import { AxiosInstance } from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import groupMembers from "./groupMembers";
import GroupStreak from "./models/GroupStreak";
import PopulatedGroupStreak from "./models/PopulatedGroupStreak";
import StreakStatus from "./StreakStatus";
import GroupStreakType from "./GroupStreakType";

export default (streakoidClient: AxiosInstance) => {
  const getAll = async ({
    creatorId,
    type,
    memberId,
    timezone,
    status
  }: {
    creatorId?: string;
    type?: GroupStreakType;
    memberId?: string;
    timezone?: string;
    status?: StreakStatus;
  }): Promise<PopulatedGroupStreak[]> => {
    try {
      let getAllGroupStreaksURL = `/${ApiVersions.v1}/${RouterCategories.groupStreaks}?`;
      if (creatorId) {
        getAllGroupStreaksURL = `${getAllGroupStreaksURL}creatorId=${creatorId}&`;
      }
      if (type) {
        getAllGroupStreaksURL = `${getAllGroupStreaksURL}type=${type}&`;
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
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const getOne = async (
    groupStreakId: string
  ): Promise<PopulatedGroupStreak> => {
    try {
      const { data } = await streakoidClient.get(
        `/${ApiVersions.v1}/${RouterCategories.groupStreaks}/${groupStreakId}`
      );
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const create = async ({
    creatorId,
    type,
    streakName,
    streakDescription,
    numberOfMinutes,
    members
  }: {
    creatorId: string;
    type: GroupStreakType;
    streakName: string;
    members: { memberId: string; groupMemberStreakId?: string }[];
    streakDescription?: string;
    numberOfMinutes?: number;
  }): Promise<PopulatedGroupStreak> => {
    try {
      const { data } = await streakoidClient.post(
        `/${ApiVersions.v1}/${RouterCategories.groupStreaks}`,
        {
          creatorId,
          type,
          streakName,
          streakDescription,
          numberOfMinutes,
          members
        }
      );
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
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
    try {
      const { data } = await streakoidClient.patch(
        `/${ApiVersions.v1}/${RouterCategories.groupStreaks}/${groupStreakId}`,
        updateData
      );
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const deleteOne = (groupStreakId: string) => {
    try {
      return streakoidClient.delete(
        `/${ApiVersions.v1}/${RouterCategories.groupStreaks}/${groupStreakId}`
      );
    } catch (err) {
      return Promise.reject(err);
    }
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
