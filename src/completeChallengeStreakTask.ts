import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import CompleteChallengeStreakTask from './models/CompleteChallengeStreakTask';
import { AxiosInstance } from 'axios';

export interface CompleteChallengeStreakTasksReturnType {
    create: ({
        userId,
        challengeStreakId,
    }: {
        userId: string;
        challengeStreakId: string;
    }) => Promise<CompleteChallengeStreakTask>;
}

const completeChallengeStreakTasks = (streakoidClient: AxiosInstance): CompleteChallengeStreakTasksReturnType => {
    const create = async ({
        userId,
        challengeStreakId,
    }: {
        userId: string;
        challengeStreakId: string;
    }): Promise<CompleteChallengeStreakTask> => {
        try {
            const { data } = await streakoidClient.post(
                `/${ApiVersions.v1}/${RouterCategories.completeChallengeStreakTasks}`,
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

export { completeChallengeStreakTasks };
