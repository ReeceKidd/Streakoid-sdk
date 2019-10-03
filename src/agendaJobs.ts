import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import { AxiosInstance } from "axios";

export default (streakoidClient: AxiosInstance) => {
  const deleteOne = (agendaJobId: string) => {
    try {
      return streakoidClient.delete(
        `/${ApiVersions.v1}/${RouterCategories.agendaJobs}/${agendaJobId}`
      );
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return {
    deleteOne
  };
};
