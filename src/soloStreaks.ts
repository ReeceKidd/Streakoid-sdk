import { AxiosInstance } from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import SupportedRequestHeaders from "./SupportedRequestHeaders";
import SoloStreak from "./models/SoloStreak";
import CurrentStreak from "./models/CurrentStreak";
import PastStreakArray from "./models/PastStreakArray";
import ActivityArray from "./models/ActivityArray";

export default (streakoidClient: AxiosInstance) => {
  const getAll = async ({
    userId,
    completedToday,
    timezone,
    active
  }: {
    userId?: string;
    completedToday?: boolean;
    timezone?: string;
    active?: boolean;
  }): Promise<SoloStreak[]> => {
    let getAllSoloStreaksURL = `/${ApiVersions.v1}/${RouterCategories.soloStreaks}?`;

    if (userId) {
      getAllSoloStreaksURL = `${getAllSoloStreaksURL}userId=${userId}&`;
    }

    if (completedToday !== undefined) {
      getAllSoloStreaksURL = `${getAllSoloStreaksURL}completedToday=${Boolean(
        completedToday
      )}&`;
    }

    if (timezone) {
      getAllSoloStreaksURL = `${getAllSoloStreaksURL}timezone=${timezone}&`;
    }

    if (active !== undefined) {
      getAllSoloStreaksURL = `${getAllSoloStreaksURL}active=${Boolean(active)}`;
    }

    const { data } = await streakoidClient.get(getAllSoloStreaksURL);
    return data;
  };

  const getOne = async (soloStreakId: string): Promise<SoloStreak> => {
    const { data } = await streakoidClient.get(
      `/${ApiVersions.v1}/${RouterCategories.soloStreaks}/${soloStreakId}`
    );
    return data;
  };

  const create = async ({
    userId,
    streakName,
    streakDescription,
    numberOfMinutes
  }: {
    userId: string;
    streakName: string;
    streakDescription?: string;
    numberOfMinutes?: number;
  }): Promise<SoloStreak> => {
    const { data } = await streakoidClient.post(
      `/${ApiVersions.v1}/${RouterCategories.soloStreaks}`,
      { userId, streakName, streakDescription, numberOfMinutes }
    );
    return data;
  };

  const update = async ({
    soloStreakId,
    updateData
  }: {
    soloStreakId: string;
    updateData?: {
      streakName?: string;
      streakDescription?: string;
      numberOfMinutes?: number;
      completedToday?: boolean;
      timezone?: string;
      active?: boolean;
      currentStreak?: CurrentStreak;
      pastStreaks?: PastStreakArray;
      activity?: ActivityArray;
    };
  }): Promise<SoloStreak> => {
    const { data } = await streakoidClient.patch(
      `/${ApiVersions.v1}/${RouterCategories.soloStreaks}/${soloStreakId}`,
      updateData
    );
    return data;
  };

  const deleteOne = (soloStreakId: string) => {
    return streakoidClient.delete(
      `/${ApiVersions.v1}/${RouterCategories.soloStreaks}/${soloStreakId}`
    );
  };

  return {
    getAll,
    getOne,
    deleteOne,
    create,
    update
  };
};
