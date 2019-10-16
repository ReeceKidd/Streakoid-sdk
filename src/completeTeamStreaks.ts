import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import CompleteTeamStreak from './models/CompleteTeamStreak';
import { AxiosInstance, AxiosResponse } from 'axios';

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

    const deleteOne = (completeTeamStreakId: string): Promise<AxiosResponse> => {
        try {
            return streakoidClient.delete(
                `/${ApiVersions.v1}/${RouterCategories.completeTeamStreaks}/${completeTeamStreakId}`,
            );
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getAll,
        deleteOne,
    };
};

export { completeTeamStreaks };
