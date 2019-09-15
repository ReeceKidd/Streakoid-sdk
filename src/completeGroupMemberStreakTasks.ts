import axios from "axios";
import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import SupportedRequestHeaders from "./SupportedRequestHeaders";
import CompleteGroupMemberStreakTask from "./models/CompleteGroupMemberStreakTask";
import axiosClient from "./axiosClient";

export default (applicatonUrl: string) => {
  const getAll = async ({
    userId,
    groupStreakId,
    groupMemberStreakId
  }: {
    userId?: string;
    groupStreakId?: string;
    groupMemberStreakId?: string;
  }): Promise<CompleteGroupMemberStreakTask[]> => {
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

    const { data } = await axiosClient.get(getAllURL);
    return data;
  };

  const create = async ({
    userId,
    groupStreakId,
    groupMemberStreakId,
    timezone
  }: {
    userId: string;
    groupStreakId: string;
    groupMemberStreakId: string;
    timezone: string;
  }): Promise<CompleteGroupMemberStreakTask> => {
    const { data } = await axiosClient.post(
      `/${ApiVersions.v1}/${RouterCategories.completeGroupMemberStreakTasks}`,
      {
        userId,
        groupStreakId,
        groupMemberStreakId
      },
      {
        headers: {
          [SupportedRequestHeaders.xTimezone]: timezone
        }
      }
    );
    return data;
  };

  const deleteOne = (completeGroupMemberStreakTaskId: string) => {
    return axiosClient.delete(
      `/${ApiVersions.v1}/${RouterCategories.completeGroupMemberStreakTasks}/${completeGroupMemberStreakTaskId}`
    );
  };

  return {
    getAll,
    create,
    deleteOne
  };
};
