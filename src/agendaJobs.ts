import axios from "axios";
import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";

export default (applicationUrl: string) => {
  const deleteOne = (agendaJobId: string) => {
    return axios.delete(
      `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.agendaJobs}/${agendaJobId}`
    );
  };

  return {
    deleteOne
  };
};
