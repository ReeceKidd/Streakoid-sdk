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
    try {
      let getAllURL = `/${ApiVersions.v1}/${RouterCategories.completeSoloStreakTasks}?`;
      if (userId) {
        getAllURL = `${getAllURL}userId=${userId}&`;
      }
      if (streakId) {
        getAllURL = `${getAllURL}streakId=${streakId}`;
      }
      const { data } = await streakoidClient.get(getAllURL);
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const create = async ({
    userId,
    soloStreakId
  }: {
    userId: string;
    soloStreakId: string;
  }): Promise<CompleteSoloStreakTask> => {
    try {
      const { data } = await streakoidClient.post(
        `/${ApiVersions.v1}/${RouterCategories.completeSoloStreakTasks}`,
        {
          userId,
          soloStreakId
        }
      );
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const deleteOne = (completeSoloStreakTaskId: string) => {
    try {
      return streakoidClient.delete(
        `/${ApiVersions.v1}/${RouterCategories.completeSoloStreakTasks}/${completeSoloStreakTaskId}`
      );
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return {
    getAll,
    create,
    deleteOne
  };
};
