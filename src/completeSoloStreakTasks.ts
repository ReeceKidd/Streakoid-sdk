import axios from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import SupportedRequestHeaders from "./SupportedRequestHeaders";
import CompleteSoloStreakTask from "./models/CompleteSoloStreakTask";

export default (applicationUrl: string) => {
  const getAll = async ({
    userId,
    streakId
  }: {
    userId?: string;
    streakId?: string;
  }): Promise<CompleteSoloStreakTask[]> => {
    let getAllURL = `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.completeSoloStreakTasks}?`;
    if (userId) {
      getAllURL = `${getAllURL}userId=${userId}&`;
    }
    if (streakId) {
      getAllURL = `${getAllURL}streakId=${streakId}`;
    }
    const { data } = await axios.get(getAllURL);
    return data;
  };

  const create = async ({
    userId,
    soloStreakId,
    timezone
  }: {
    userId: string;
    soloStreakId: string;
    timezone: string;
  }): Promise<CompleteSoloStreakTask> => {
    const { data } = await axios.post(
      `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.completeSoloStreakTasks}`,
      {
        userId,
        soloStreakId
      },
      {
        headers: {
          [SupportedRequestHeaders.xTimezone]: timezone
        }
      }
    );
    return data;
  };

  const deleteOne = (completeSoloStreakTaskId: string) => {
    return axios.delete(
      `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.completeSoloStreakTasks}/${completeSoloStreakTaskId}`
    );
  };

  return {
    getAll,
    create,
    deleteOne
  };
};
