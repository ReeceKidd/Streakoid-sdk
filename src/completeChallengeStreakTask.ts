import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import CompleteChallengeStreakTask from './models/CompleteChallengeStreakTask';
import { AxiosInstance } from 'axios';

const completeChallengeStreakTasks = (streakoidClient: AxiosInstance) => {
    const getAll = async ({
        userId,
        challengeStreakId,
    }: {
        userId?: string;
        challengeStreakId?: string;
    }): Promise<CompleteChallengeStreakTask[]> => {
        try {
            let getAllURL = `/${ApiVersions.v1}/${RouterCategories.completeChallengeStreakTasks}?`;
            if (userId) {
                getAllURL = `${getAllURL}userId=${userId}&`;
            }
            if (challengeStreakId) {
                getAllURL = `${getAllURL}challengeStreakId=${challengeStreakId}`;
            }
            const { data } = await streakoidClient.get(getAllURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

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
        getAll,
        create,
    };
};

export { completeChallengeStreakTasks };
