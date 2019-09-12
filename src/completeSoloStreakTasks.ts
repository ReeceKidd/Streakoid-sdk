import axios from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import SupportedRequestHeaders from "./SupportedRequestHeaders";

export default (applicationUrl: string) => {

    const getAll = (userId?: string, streakId?: string) => {
        let getAllURL = `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.completeSoloStreakTasks}?`;
        if (userId) {
            getAllURL = `${getAllURL}userId=${userId}&`;
        }
        if (streakId) {
            getAllURL = `${getAllURL}streakId=${streakId}`;
        }

        return axios.get(getAllURL);
    };

    const create = (userId: string, soloStreakId: string, timezone: string) => {
        return axios.post(
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
