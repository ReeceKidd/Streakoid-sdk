import axios from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import StreakTrackingEvent from "./models/StreakTrackingEvent";
import axiosClient from "./axiosClient";

export default (applicationUrl: string) => {
  const getAll = async ({
    type,
    userId,
    streakId
  }: {
    type?: string;
    userId?: string;
    streakId?: string;
  }): Promise<StreakTrackingEvent[]> => {
    let getAllSoloStreaksURL = `/${ApiVersions.v1}/${RouterCategories.streakTrackingEvents}?`;

    if (type) {
      getAllSoloStreaksURL = `${getAllSoloStreaksURL}type=${type}&`;
    }
    if (userId) {
      getAllSoloStreaksURL = `${getAllSoloStreaksURL}userId=${userId}&`;
    }
    if (streakId) {
      getAllSoloStreaksURL = `${getAllSoloStreaksURL}streakId=${streakId}`;
    }
    const { data } = await axiosClient.get(getAllSoloStreaksURL);
    return data;
  };

  const getOne = async (
    streakTrackingEventId: string
  ): Promise<StreakTrackingEvent> => {
    const { data } = await axiosClient.get(
      `/${ApiVersions.v1}/${RouterCategories.streakTrackingEvents}/${streakTrackingEventId}`
    );
    return data;
  };

  const create = async ({
    type,
    streakId,
    userId
  }: {
    type: string;
    streakId: string;
    userId: string;
  }): Promise<StreakTrackingEvent> => {
    const { data } = await axiosClient.post(
      `/${ApiVersions.v1}/${RouterCategories.streakTrackingEvents}`,
      { type, streakId, userId }
    );
    return data;
  };

  const deleteOne = (streakTrackingEventId: string) => {
    return axiosClient.delete(
      `/${ApiVersions.v1}/${RouterCategories.streakTrackingEvents}/${streakTrackingEventId}`
    );
  };

  return {
    getAll,
    getOne,
    create,
    deleteOne
  };
};
