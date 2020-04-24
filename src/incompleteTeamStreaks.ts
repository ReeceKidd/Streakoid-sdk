import ApiVersions from './ApiVersions';
import { AxiosInstance } from 'axios';
import { IncompleteTeamStreak } from '@streakoid/streakoid-models/lib/Models/IncompleteTeamStreak';
import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const incompleteTeamStreaks = (streakoidClient: AxiosInstance) => {
    const getAll = async ({ teamStreakId }: { teamStreakId?: string }): Promise<IncompleteTeamStreak[]> => {
        try {
            let getAllURL = `/${ApiVersions.v1}/${RouterCategories.incompleteTeamStreaks}?`;
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

export { incompleteTeamStreaks };
