import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import Challenge from './models/Challenge';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const streakRecommendations = (streakoidClient: AxiosInstance) => {
    const getAll = async ({ random, limit }: { random: boolean; limit: number }): Promise<Challenge[]> => {
        try {
            let getAllSoloStreaksURL = `/${ApiVersions.v1}/${RouterCategories.streakRecommendations}?`;

            if (random) {
                getAllSoloStreaksURL = `${getAllSoloStreaksURL}random=true&`;
            }

            if (limit) {
                getAllSoloStreaksURL = `${getAllSoloStreaksURL}limit=${limit}&`;
            }

            const { data } = await streakoidClient.get(getAllSoloStreaksURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const create = async ({
        streakName,
        streakDescription,
    }: {
        streakName: string;
        streakDescription?: string;
    }): Promise<Challenge> => {
        try {
            const { data } = await streakoidClient.post(
                `/${ApiVersions.v1}/${RouterCategories.streakRecommendations}`,
                {
                    streakName,
                    streakDescription,
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
