import { AxiosInstance } from "axios";
import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import SupportedRequestHeaders from "./SupportedRequestHeaders";
import CompleteGroupMemberStreakTask from "./models/CompleteGroupMemberStreakTask";

export default (streakoidClient: AxiosInstance) => {
  const getAll = async ({
    userId,
    groupStreakId,
    groupMemberStreakId
  }: {
    userId?: string;
    groupStreakId?: string;
    groupMemberStreakId?: string;
  }): Promise<CompleteGroupMemberStreakTask[]> => {
    try {
      let getAllURL = `/${ApiVersions.v1}/${RouterCategories.completeGroupMemberStreakTasks}?`;
      if (userId) {
        getAllURL = `${getAllURL}userId=${userId}&`;
      }
      if (groupStreakId) {
        getAllURL = `${getAllURL}groupStreakId=${groupStreakId}&`;
      }
      if (groupMemberStreakId) {
        getAllURL = `${getAllURL}groupMemberStreakId=${groupMemberStreakId}`;
      }

      const { data } = await streakoidClient.get(getAllURL);
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const create = async ({
    userId,
    groupStreakId,
    groupMemberStreakId
  }: {
    userId: string;
    groupStreakId: string;
    groupMemberStreakId: string;
  }): Promise<CompleteGroupMemberStreakTask> => {
    try {
      const { data } = await streakoidClient.post(
        `/${ApiVersions.v1}/${RouterCategories.completeGroupMemberStreakTasks}`,
        {
          userId,
          groupStreakId,
          groupMemberStreakId
        }
      );
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const deleteOne = (completeGroupMemberStreakTaskId: string) => {
    try {
      return streakoidClient.delete(
        `/${ApiVersions.v1}/${RouterCategories.completeGroupMemberStreakTasks}/${completeGroupMemberStreakTaskId}`
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
