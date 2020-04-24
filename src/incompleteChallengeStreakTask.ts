import ApiVersions from './ApiVersions';
import { AxiosInstance } from 'axios';
import RouterCategories from '@streakoid/streakoid-models/lib/Types/RouterCategories';
import { IncompleteChallengeStreakTask } from '@streakoid/streakoid-models/lib/Models/IncompleteChallengeStreakTask';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const incompleteChalllengeStreakTasks = (streakoidClient: AxiosInstance) => {
    const create = async ({
        userId,
        challengeStreakId,
    }: {
        userId: string;
        challengeStreakId: string;
    }): Promise<IncompleteChallengeStreakTask> => {
        try {
            const { data } = await streakoidClient.post(
                `/${ApiVersions.v1}/${RouterCategories.incompleteChallengeStreakTasks}`,
                {
                    userId,
                    challengeStreakId,
                },
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        create,
    };
};

export { incompleteChalllengeStreakTasks };
