import { AxiosInstance } from 'axios';

import ApiVersions from './ApiVersions';
import RouterCategories from './RouterCategories';
import ChallengeStreak from './models/ChallengeStreak';
import StreakStatus from './StreakStatus';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const challengeStreaks = (streakoidClient: AxiosInstance) => {
    const getAll = async ({
        userId,
        completedToday,
        timezone,
        active,
        status,
    }: {
        userId?: string;
        challengeId?: string;
        timezone?: string;
        status?: StreakStatus;
        active?: boolean;
        completedToday?: boolean;
    }): Promise<ChallengeStreak[]> => {
        try {
            let getAllChallengeStreaksURL = `/${ApiVersions.v1}/${RouterCategories.challengeStreaks}?`;

            if (userId) {
                getAllChallengeStreaksURL = `${getAllChallengeStreaksURL}userId=${userId}&`;
            }

            if (timezone) {
                getAllChallengeStreaksURL = `${getAllChallengeStreaksURL}timezone=${timezone}&`;
            }

            if (status) {
                getAllChallengeStreaksURL = `${getAllChallengeStreaksURL}status=${status}&`;
            }

            if (completedToday !== undefined) {
                getAllChallengeStreaksURL = `${getAllChallengeStreaksURL}completedToday=${Boolean(completedToday)}&`;
            }

            if (active !== undefined) {
                getAllChallengeStreaksURL = `${getAllChallengeStreaksURL}active=${Boolean(active)}&`;
            }

            const { data } = await streakoidClient.get(getAllChallengeStreaksURL);
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const getOne = async (challengeStreakId: string): Promise<ChallengeStreak> => {
        try {
            const { data } = await streakoidClient.get(
                `/${ApiVersions.v1}/${RouterCategories.challengeStreaks}/${challengeStreakId}`,
            );
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const create = async ({
        userId,
        challengeId,
    }: {
        userId: string;
        challengeId: string;
    }): Promise<ChallengeStreak> => {
        try {
            const { data } = await streakoidClient.post(`/${ApiVersions.v1}/${RouterCategories.challengeStreaks}`, {
                userId,
                challengeId,
            });
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return {
        getAll,
        getOne,
        create,
    };
};

export { challengeStreaks };
