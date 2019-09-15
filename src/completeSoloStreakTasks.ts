import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import SupportedRequestHeaders from "./SupportedRequestHeaders";
import CompleteSoloStreakTask from "./models/CompleteSoloStreakTask";
import { AxiosInstance } from "axios";

export default (streakoidClient: AxiosInstance) => {
  const getAll = async ({
    userId,
    streakId
  }: {
    userId?: string;
    streakId?: string;
  }): Promise<CompleteSoloStreakTask[]> => {
    let getAllURL = `/${ApiVersions.v1}/${RouterCategories.completeSoloStreakTasks}?`;
    if (userId) {
      getAllURL = `${getAllURL}userId=${userId}&`;
    }
    if (streakId) {
      getAllURL = `${getAllURL}streakId=${streakId}`;
    }
    const { data } = await streakoidClient.get(getAllURL);
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
    const { data } = await streakoidClient.post(
      `/${ApiVersions.v1}/${RouterCategories.completeSoloStreakTasks}`,
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
    return streakoidClient.delete(
      `/${ApiVersions.v1}/${RouterCategories.completeSoloStreakTasks}/${completeSoloStreakTaskId}`
    );
  };

  return {
    getAll,
    create,
    deleteOne
  };
};
