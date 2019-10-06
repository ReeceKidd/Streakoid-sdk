import { AxiosInstance } from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import groupMembers from "./groupMembers";
import TeamStreak from "./models/TeamStreak";
import PopulatedteamStreak from "./models/PopulatedTeamStreak";
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
  }): Promise<PopulatedteamStreak[]> => {
    try {
      let getAllteamStreaksURL = `/${ApiVersions.v1}/${RouterCategories.teamStreaks}?`;
      if (creatorId) {
        getAllteamStreaksURL = `${getAllteamStreaksURL}creatorId=${creatorId}&`;
      }
      if (memberId) {
        getAllteamStreaksURL = `${getAllteamStreaksURL}memberId=${memberId}&`;
      }
      if (timezone) {
        getAllteamStreaksURL = `${getAllteamStreaksURL}timezone=${timezone}&`;
      }
      if (status) {
        getAllteamStreaksURL = `${getAllteamStreaksURL}status=${status}&`;
      }
      const { data } = await streakoidClient.get(getAllteamStreaksURL);
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const getOne = async (teamStreakId: string): Promise<PopulatedteamStreak> => {
    try {
      const { data } = await streakoidClient.get(
        `/${ApiVersions.v1}/${RouterCategories.teamStreaks}/${teamStreakId}`
      );
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
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
  }): Promise<PopulatedteamStreak> => {
    try {
      const { data } = await streakoidClient.post(
        `/${ApiVersions.v1}/${RouterCategories.teamStreaks}`,
        {
          creatorId,
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
    teamStreakId,
    updateData
  }: {
    teamStreakId: string;
    updateData: {
      creatorId?: string;
      streakName?: string;
      streakDescription?: string;
      numberOfMinutes?: number;
      timezone?: string;
      status?: StreakStatus;
    };
  }): Promise<TeamStreak> => {
    try {
      const { data } = await streakoidClient.patch(
        `/${ApiVersions.v1}/${RouterCategories.teamStreaks}/${teamStreakId}`,
        updateData
      );
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const deleteOne = (teamStreakId: string) => {
    try {
      return streakoidClient.delete(
        `/${ApiVersions.v1}/${RouterCategories.teamStreaks}/${teamStreakId}`
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
