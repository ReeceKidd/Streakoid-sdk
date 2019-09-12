import axios from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";


export default (applicationUrl: string) => {
    const getAll = ({
        type,
        userId,
        streakId
    }: {
            type?: string;
            userId?: string;
            streakId?: string;
        }) => {
        let getAllSoloStreaksURL = `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.streakTrackingEvents}?`;

        if (type) {
            getAllSoloStreaksURL = `${getAllSoloStreaksURL}type=${type}&`;
        }
        if (userId) {
            getAllSoloStreaksURL = `${getAllSoloStreaksURL}userId=${userId}&`;
        }
        if (streakId) {
            getAllSoloStreaksURL = `${getAllSoloStreaksURL}streakId=${streakId}`;
        }
        return axios.get(getAllSoloStreaksURL);
    };

    const getOne = (streakTrackingEventId: string) => {
        return axios.get(
            `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.streakTrackingEvents}/${streakTrackingEventId}`
        );
    };

    const create = (
        type: string,
        streakId: string,
        userId: string
    ) => {
        return axios.post(
            `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.streakTrackingEvents}`,
            { type, streakId, userId }
        );
    };

    const deleteOne = (streakTrackingEventId: string) => {
        return axios.delete(
            `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.streakTrackingEvents}/${streakTrackingEventId}`
        );
    };

    return {
        getAll,
        getOne,
        create,
        deleteOne
    };
};
