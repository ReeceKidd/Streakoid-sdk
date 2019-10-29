import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import CompleteTeamStreak from './models/CompleteTeamStreak';
import { AxiosInstance } from 'axios';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const incompleteTeamStreaks = (streakoidClient: AxiosInstance) => {
    const getAll = async ({ teamStreakId }: { teamStreakId?: string }): Promise<CompleteTeamStreak[]> => {
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
