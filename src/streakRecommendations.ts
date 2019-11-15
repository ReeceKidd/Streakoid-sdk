import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import StreakRecommendation from './models/StreakRecoomendation';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const streakRecommendations = (streakoidClient: AxiosInstance) => {
    const getAll = async ({  }: {}): Promise<StreakRecommendation[]> => {
        try {
            const getAllSoloStreaksURL = `/${ApiVersions.v1}/${RouterCategories.streakRecommendations}?`;

            const { data } = await streakoidClient.get(getAllSoloStreaksURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const create = async ({
        streakName,
        streakDescription,
        numberOfMinutes,
    }: {
        streakName: string;
        streakDescription?: string;
        numberOfMinutes?: number;
    }): Promise<StreakRecommendation> => {
        try {
            const { data } = await streakoidClient.post(
                `/${ApiVersions.v1}/${RouterCategories.streakRecommendations}`,
                {
                    streakName,
                    streakDescription,
                    numberOfMinutes,
                },
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getAll,
        create,
    };
};

export { streakRecommendations };
