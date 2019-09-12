import axios from "axios";
import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import SupportedRequestHeaders from "./SupportedRequestHeaders";

export default (applicatonUrl: string) => {
    const getAll = ({
        userId,
        groupStreakId,
        groupMemberStreakId
    }: {
            userId?: string;
            groupStreakId?: string;
            groupMemberStreakId?: string;
        }) => {
        let getAllURL = `${applicatonUrl}/${ApiVersions.v1}/${RouterCategories.completeGroupMemberStreakTasks}?`;
        if (userId) {
            getAllURL = `${getAllURL}userId=${userId}&`;
        }
        if (groupStreakId) {
            getAllURL = `${getAllURL}groupStreakId=${groupStreakId}&`;
        }
        if (groupMemberStreakId) {
            getAllURL = `${getAllURL}groupMemberStreakId=${groupMemberStreakId}`;
        }

        return axios.get(getAllURL);
    };

    const create = (
        userId: string,
        groupStreakId: string,
        groupMemberStreakId: string,
        timezone: string
    ) => {
        return axios.post(
            `${applicatonUrl}/${ApiVersions.v1}/${RouterCategories.completeGroupMemberStreakTasks}`,
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
    };

    const deleteOne = (completeGroupMemberStreakTaskId: string) => {
        return axios.delete(
            `${applicatonUrl}/${ApiVersions.v1}/${RouterCategories.completeGroupMemberStreakTasks}/${completeGroupMemberStreakTaskId}`
        );
    };

    return {
        getAll,
        create,
        deleteOne
    };

};
