import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import { Challenge } from '@streakoid/streakoid-models/lib/Models/Challenge';
import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';

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

    return {
        getAll,
    };
};

export { streakRecommendations };
