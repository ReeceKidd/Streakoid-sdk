import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import axiosClient from "./axiosClient";
axiosClient;

export default (applicationUrl: string) => {
  const deleteOne = (agendaJobId: string) => {
    return axiosClient.delete(
      `/${ApiVersions.v1}/${RouterCategories.agendaJobs}/${agendaJobId}`
    );
  };

  return {
    deleteOne
  };
};
