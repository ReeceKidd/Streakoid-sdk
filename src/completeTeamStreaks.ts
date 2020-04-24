import ApiVersions from './ApiVersions';
import { CompleteTeamStreak } from '@streakoid/streakoid-models/lib/Models/CompleteTeamStreak';
import { AxiosInstance } from 'axios';
import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const completeTeamStreaks = (streakoidClient: AxiosInstance) => {
    const getAll = async ({ teamStreakId }: { teamStreakId?: string }): Promise<CompleteTeamStreak[]> => {
        try {
            let getAllURL = `/${ApiVersions.v1}/${RouterCategories.completeTeamStreaks}?`;
            if (teamStreakId) {
                getAllURL = `${getAllURL}teamStreakId=${teamStreakId}`;
            }
            const { data } = await streakoidClient.get(getAllURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getAll,
    };
};

export { completeTeamStreaks };
