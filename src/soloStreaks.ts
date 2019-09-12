import axios from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import SupportedRequestHeaders from "./SupportedRequestHeaders";



export default (applicationUrl: string) => {
    const getAll = ({
        userId,
        completedToday,
        timezone,
        active
    }: {
            userId?: string;
            completedToday?: boolean;
            timezone?: string;
            active?: boolean;
        }) => {
        let getAllSoloStreaksURL = `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.soloStreaks}?`;

        if (userId) {
            getAllSoloStreaksURL = `${getAllSoloStreaksURL}userId=${userId}&`;
        }

        if (completedToday !== undefined) {
            getAllSoloStreaksURL = `${getAllSoloStreaksURL}completedToday=${Boolean(
                completedToday
            )}&`;
        }

        if (timezone) {
            getAllSoloStreaksURL = `${getAllSoloStreaksURL}timezone=${timezone}&`;
        }

        if (active !== undefined) {
            getAllSoloStreaksURL = `${getAllSoloStreaksURL}active=${Boolean(active)}`;
        }

        return axios.get(getAllSoloStreaksURL);
    };

    const getOne = (soloStreakId: string) => {
        return axios.get(
            `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.soloStreaks}/${soloStreakId}`
        );
    };

    const create = (
        userId: string,
        name: string,
        timezone: string,
        description?: string,
        numberOfMinutes?: number
    ) => {
        return axios.post(
            `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.soloStreaks}`,
            { userId, name, description, numberOfMinutes },
            { headers: { [SupportedRequestHeaders.xTimezone]: timezone } }
        );
    };

    const update = (
        soloStreakId: string,
        timezone: string,
        data?: {
            name?: string;
            description?: string;
            completedToday?: boolean;
            active?: boolean;
            currentStreak?: { startDate?: Date; numberOfDaysInARow?: number };
            pastStreaks?: [
                {
                    startDate: Date;
                    numberOfDaysInARow: number;
                    endDate: Date;
                }
            ];
            activity?: { type: string; time: Date }[];
        }
    ) => {
        return axios.patch(
            `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.soloStreaks}/${soloStreakId}`,
            data,
            { headers: { [SupportedRequestHeaders.xTimezone]: timezone } }
        );
    };

    const deleteOne = (soloStreakId: string) => {
        return axios.delete(
            `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.soloStreaks}/${soloStreakId}`
        );
    };

    return {
        getAll,
        getOne,
        deleteOne,
        create,
        update
    };
};
