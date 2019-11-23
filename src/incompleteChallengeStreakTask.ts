import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import IncompleteChalllengeStreakTask from './models/IncompleteChallengeStreakTask';
import { AxiosInstance } from 'axios';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const incompleteChalllengeStreakTasks = (streakoidClient: AxiosInstance) => {
    const create = async ({
        userId,
        challengeStreakId,
    }: {
        userId: string;
        challengeStreakId: string;
    }): Promise<IncompleteChalllengeStreakTask> => {
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
