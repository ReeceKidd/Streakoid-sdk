import axios from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import SupportedRequestHeaders from "./SupportedRequestHeaders";
import SoloStreak from "./models/SoloStreak";
import { StreakTrackingEventType } from "./types";

export default (applicationUrl: string) => {
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
    let getAllSoloStreaksURL = `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.soloStreaks}?`;

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

    const { data } = await axios.get(getAllSoloStreaksURL);
    return data;
  };

  const getOne = async (soloStreakId: string): Promise<SoloStreak> => {
    const { data } = await axios.get(
      `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.soloStreaks}/${soloStreakId}`
    );
    return data;
  };

  const create = async ({
    userId,
    streakName,
    streakDescription,
    timezone,
    numberOfMinutes
  }: {
    userId: string;
    streakName: string;
    timezone: string;
    streakDescription?: string;
    numberOfMinutes?: number;
  }): Promise<SoloStreak> => {
    const { data } = await axios.post(
      `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.soloStreaks}`,
      { userId, streakName, streakDescription, numberOfMinutes },
      { headers: { [SupportedRequestHeaders.xTimezone]: timezone } }
    );
    return data;
  };

  const update = async ({
    soloStreakId,
    timezone,
    updateData
  }: {
    soloStreakId: string;
    timezone: string;
    updateData?: {
      streakName?: string;
      streakDescription?: string;
      completedToday?: boolean;
      active?: boolean;
      currentStreak?: {
        startDate?: string;
        numberOfDaysInARow?: number;
        endDate?: string;
      };
      pastStreaks?: [
        {
          startDate: string;
          numberOfDaysInARow: number;
          endDate: string;
        }
      ];
      activity?: [{ type: StreakTrackingEventType; time: string }];
    };
  }): Promise<SoloStreak> => {
    const { data } = await axios.patch(
      `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.soloStreaks}/${soloStreakId}`,
      updateData,
      { headers: { [SupportedRequestHeaders.xTimezone]: timezone } }
    );
    return data;
  };

  const deleteOne = (soloStreakId: string) => {
    return axios.delete(
      `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.soloStreaks}/${soloStreakId}`
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
