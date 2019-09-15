import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import { AxiosInstance } from "axios";

export default (streakoidClient: AxiosInstance) => {
  const deleteOne = (agendaJobId: string) => {
    return streakoidClient.delete(
      `/${ApiVersions.v1}/${RouterCategories.agendaJobs}/${agendaJobId}`
    );
  };

  return {
    deleteOne
  };
};
